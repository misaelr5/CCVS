# CCVS — Inicio de trabajo con Codex (V3)

## Qué contiene este paquete

- `PROMPT_MAESTRO_V3.md`: **instrucción única**, sustituye por completo los prompts viejos.
- `referencias/`: fotogramas de las páginas `passioncitychurch.com/` y `/us/` para comparación editorial.
- `videos/`: grabaciones de referencia para revisar interacciones y comportamiento de la web. Usarlas solo cuando las capturas no resuelvan una duda; no subirlas a la web final.
- `identidad/`: logos reales del cliente en formato provisional; emblema madre primero.
- `investigacion/`: descripción de Claude sobre `passioncitychurchdc.com`, **solo estructura**, no estilos.

## Pasos

1. Extraé este ZIP en la raíz de la carpeta del proyecto CCVS actual. Conservá sus archivos existentes hasta que Codex realice un respaldo.
2. Abrí esa carpeta con VS Code/Codex.
3. Elegí el modelo de programación con mejor capacidad que tengas disponible; razonamiento alto para reconstrucción y comparación visual. Para correcciones pequeñas, usar razonamiento medio.
4. Enviá este único mensaje:

> Leé `PROMPT_MAESTRO_V3.md` completo y ejecutá la reconstrucción desde cero según sus instrucciones. Primero respaldá el estado actual y preservá fotos, logos y secretos. Para el diseño usá `referencias/` como evidencia principal, luego `videos/` solo si hace falta evaluar movimiento. `investigacion/` es sobre el sitio DC: no lo uses como referencia visual principal. No hagas push ni deploy. Verificá responsive y build; informá las diferencias visuales no resueltas.

## Importante

El sitio visual principal es `https://passioncitychurch.com` y `/us/`, NO la home de `https://passioncitychurchdc.com`.

El logo de cabecera es ÚNICAMENTE el emblema madre a color (cruz y paloma); CCVS bordó es local secundario. El color de acento es `#631918`.

Los logos definitivos transparentes y las fotografías locales finales aún están pendientes. No presentar el prototipo como final sin esos materiales.
