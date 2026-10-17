# Transitorio bifásico

Aplicación MATLAB (App Designer) para simular transitorios bifásicos agua-aire en tuberías a presión con modelos Simulink. Cubre dos procesos, seleccionables en la interfaz:

- Vaciado (`VaciadoBifasicoSimple.slx`), con la casilla "Sin tope de Pv, caso crítico puro" que usa `VaciadoBifasicoSimple_sinPv.slx`.
- Llenado (`AirInTwoPipes.slx`).

Requiere MATLAB R2026b con Simulink.

## Instalación

Los modelos Simulink (`VaciadoBifasicoSimple.slx`, `VaciadoBifasicoSimple_sinPv.slx`, `AirInTwoPipes.slx`) son privados del autor y no se distribuyen en este repositorio. La app `app/TransitorioBifasico.mlapp` se publica como referencia de la interfaz y solo simula si esos tres modelos están en la misma carpeta. Los resultados de referencia, los datos y la página interactiva sí están completos.

## Uso

1. Elegir el proceso y los parámetros, y pulsar Simular.
2. Las pestañas Resultados y README muestran las gráficas y las instrucciones.
3. El botón con icono de gráfica exporta PNG, SVG o PDF; el botón con icono de tabla exporta CSV o XLSX.

## Resultados de referencia

Corridas por lotes con los parámetros por defecto.

| Caso | P1 mín | v máx | Le final |
|---|---|---|---|
| Vaciado con Pv | 2,337 kPa | 4,613 m/s | 136,24 m |
| Vaciado sin Pv | 0,0211 kPa | 4,609 m/s | 139,73 m |
| Llenado | 10,33 m.c.a. (valor inicial) | 9,592 m/s | 1528,86 m |

Los datos están en `data/` (CSV con columnas `t_s, v_m_s, P_kPa_o_mca, L_m`) y alimentan las figuras de `docs/figuras/` y la página interactiva.

## Página interactiva

`docs/index.html` es una página estática sin compilación: contadores animados, gráficas con cursor, selector de caso y una animación de la tubería a partir de Le(t) y v(t). Se publica con GitHub Pages desde la carpeta `docs/` si el plan de la cuenta lo permite.

## Estructura

```
app/    App de MATLAB (sin los modelos Simulink, que son privados)
data/   Series temporales de los tres casos (CSV)
docs/   Página web, figuras SVG y PNG
```

## Cómo citar

Ortega Heredia, A. H. (2026). *Understanding starting-up operation in pressurised systems: mathematical and machine learning models*. Tesis de M.Sc. en Ingeniería Civil, Universidad de Cartagena, Colombia. Director: Ph.D. Óscar E. Coronado-Hernández.

Publicación derivada: *Designs* 2026, 10, 39. https://doi.org/10.3390/designs10020039

## Notas

Las unidades de la salida del llenado (v, P1 en m.c.a., Le) se tomaron de la salida del modelo y no se han verificado con el autor del modelo.

## Descargo de responsabilidad

El software se entrega "tal cual", sin garantía. El autor no responde por modificaciones, bifurcaciones ni redistribuciones de terceros; cada usuario debe revisar y validar el código y los resultados antes de usarlos. Ver [DESCARGO.md](DESCARGO.md).
