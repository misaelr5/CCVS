param([Parameter(Mandatory=$true)][string]$Ffmpeg)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path $PSScriptRoot -Parent
$sourceVideo=Join-Path $projectRoot 'src/assets/photos/IMG_8679.MOV'
$outputDirectory=Join-Path $projectRoot 'public/media'
$desktopVideo=Join-Path $outputDirectory 'nuestra-historia.mp4'
$mobileVideo=Join-Path $outputDirectory 'nuestra-historia-mobile.mp4'
$posterImage=Join-Path $projectRoot 'src/assets/photos/nuestra-historia-video.jpg'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

# El original HLG/BT.2020 necesita convertirse a SDR/BT.709 para navegadores.
$filters='scale=1280:720:flags=lanczos,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30'
& $Ffmpeg -hide_banner -loglevel warning -y -threads 2 -i $sourceVideo -map 0:v:0 -map '0:a:0?' -map_metadata -1 -vf $filters -filter_threads 1 -c:v libx264 -preset fast -crf 26 -threads 2 -c:a aac -b:a 96k -ac 2 -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709 $desktopVideo
if($LASTEXITCODE -ne 0){throw 'Falló la conversión del video de escritorio'}
& $Ffmpeg -hide_banner -loglevel warning -y -i $desktopVideo -map 0:v:0 -map '0:a:0?' -map_metadata -1 -vf 'scale=720:406:flags=lanczos' -filter_threads 1 -c:v libx264 -preset fast -crf 28 -threads 2 -c:a copy -movflags +faststart $mobileVideo
if($LASTEXITCODE -ne 0){throw 'Falló la conversión del video móvil'}
& $Ffmpeg -hide_banner -loglevel warning -y -ss 2 -i $desktopVideo -frames:v 1 -update 1 -q:v 3 $posterImage
if($LASTEXITCODE -ne 0){throw 'Falló la imagen previa del video'}
Get-Item $desktopVideo,$mobileVideo,$posterImage | Select-Object Name,Length
