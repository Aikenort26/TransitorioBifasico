# Plan de publicación en MATLAB File Exchange

File Exchange es el repositorio oficial de MathWorks; lo publicado ahí aparece también en el Explorador de complementos de MATLAB.

## Antes de publicar (decisiones del autor)

1. Autorización: confirmar con el director de la tesis, Óscar E. Coronado-Hernández, y con la Universidad de Cartagena que los modelos Simulink pueden hacerse públicos.
2. Autores: figura solo Aiken H. Ortega-Heredia; añadir a otros autores solo con su afiliación confirmada.
3. Licencia: File Exchange exige una licencia de código abierto. Proponer BSD 3-Clause (la que usa MathWorks por defecto) y crear `LICENSE`.
4. Verificar las unidades y el parámetro `H_d` del modelo de llenado (pendiente).
5. Probar a mano los botones de exportar y la instalación limpia del `.mltbx` en el equipo de escritorio.

## Preparación del repositorio

1. Añadir `LICENSE`, una imagen de portada (captura de la app, 1280x720 aprox.) y `.github/` no es necesario.
2. Dejar en la raíz el `.mltbx` en una Release de GitHub (ya existe v1.2.0).
3. Confirmar en el `.mltbx`: nombre, versión, autor, resumen, compatibilidad R2026b en adelante, productos requeridos (MATLAB, Simulink).
4. Hacer público el repositorio (Settings, Danger Zone, Change visibility). Es el paso irreversible de hecho: lo público puede quedar copiado.

## Publicación

Vía GitHub (recomendada, se sincroniza sola):
1. Iniciar sesión en https://www.mathworks.com/matlabcentral/fileexchange con la cuenta MathWorks.
2. Publish, elegir "Link to GitHub", autorizar y seleccionar `Aikenort26/TransitorioBifasico`, rama `master`.
3. Marcar "Select a GitHub Release": así los usuarios descargan el `.mltbx` de la última Release.
4. Completar título, resumen, descripción, etiquetas (water hammer, two-phase flow, Simulink, air valve, pipeline filling), imagen de portada y compatibilidad de versión.
5. Aceptar licencia y publicar.

## Después

1. Probar la instalación desde el Explorador de complementos (puede tardar en indexarse).
2. Añadir la cita de la tesis en la descripción (ya está en `README.md` y `CITATION.cff`).
3. Para nuevas versiones: crear una Release nueva en GitHub; File Exchange la toma automáticamente.
