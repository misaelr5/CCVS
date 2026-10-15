param([Parameter(Mandatory=$true)][string]$Ffmpeg)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path $PSScriptRoot -Parent
$sourceVideo=Join-Path $projectRoot 'src/assets/videos/IMG_2757.MOV'
$outputDirectory=Join-Path $projectRoot 'public/media'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$desktopVideo=Join-Path $outputDirectory 'portada-ccvs.mp4'
$mobileVideo=Join-Path $outputDirectory 'portada-ccvs-mobile.mp4'
$posterImage=Join-Path $projectRoot 'src/assets/photos/portada-video.jpg'
# The supplied iPhone footage is HLG/BT.2020. Convert to SDR/BT.709 before H.264.
$filters='scale=1280:720:flags=lanczos,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30'
& $Ffmpeg -hide_banner -loglevel warning -y -threads 2 -i $sourceVideo -map 0:v:0 -map 0:a:0 -map_metadata -1 -vf $filters -filter_threads 1 -c:v libx264 -preset fast -crf 26 -threads 2 -c:a aac -b:a 96k -ac 2 -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709 $desktopVideo
if($LASTEXITCODE -ne 0){throw 'Desktop video encoding failed'}
& $Ffmpeg -hide_banner -loglevel warning -y -i $desktopVideo -map 0:v:0 -map 0:a:0 -map_metadata -1 -vf 'scale=960:540:flags=lanczos' -filter_threads 1 -c:v libx264 -preset fast -crf 27 -threads 2 -c:a copy -movflags +faststart $mobileVideo
if($LASTEXITCODE -ne 0){throw 'Mobile video encoding failed'}
& $Ffmpeg -hide_banner -loglevel warning -y -ss 2 -i $desktopVideo -frames:v 1 -update 1 -q:v 2 $posterImage
if($LASTEXITCODE -ne 0){throw 'Video poster extraction failed'}
Get-Item $desktopVideo,$mobileVideo,$posterImage | Select-Object Name,Length
