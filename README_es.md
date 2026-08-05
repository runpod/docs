# Página de documentación de Runpod

<!-- hy-mt2-i18n:start -->
[English](./README.md) | [中文](./README_zh-CN.md) | [日本語](./README_ja.md) | **Español**
<!-- hy-mt2-i18n:end -->


Este sitio web fue creado con [Mintlify](https://mintlify.com/).

## Publicación de cambios

Cree una solicitud de pull request para realizar cambios en los documentos y solicite una revisión a [@lavanya-gunreddi](https://github.com/lavanya-gunreddi). Los cambios se desplegarán automáticamente en el entorno de producción una vez que se envíen al branch `main`.

## Ejecutar las documentaciones localmente

Instalar Mintlify:

```shell
npm i -g mintlify
```

Inicie un servidor de desarrollo local en su navegador:

```shell
mintlify dev
```

La mayoría de los cambios se reflejarán en tiempo real sin necesidad de reiniciar el servidor.

## Revisión de código

- Instalar [vale](https://vale.sh/docs/vale-cli/installation/)
- Analizar sintácticamente una carpeta o archivo específico:

```bash
vale path/to/docs/
# o
vale path/to/*.md
```

## Formatear ejemplos de código en Python

Instale `blacken-docs`.

```bash
python3 -m pip install blacken-docs
```

Ejecuta el formateador.

```bash
yarn format
```

```bash
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

## Actualizar CPUs y GPUs

```bash
# Configurar entorno virtual
python3 -m venv helpers/.venv
source helpers/.venv/bin/activate
pip install -r helpers/requirements.txt

# Ejecutar scripts
python3 helpers/gpu_types.py
python3 helpers/sls_cpu_types.py
```

## Pruebas de experiencia del agente

El archivo `tests/TESTS.md` contiene definiciones de pruebas para validar la calidad de la documentación mediante pruebas con agentes de IA. Estas pruebas simulan solicitudes reales de usuarios: un agente de programación debe lograr el objetivo utilizando únicamente la documentación tal como se encuentra actualmente.

### Requisitos

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) con los servidores MCP de Runpod configurados:
  ```bash
  # Agregar el servidor MCP API de Runpod
  claude mcp add runpod --scope user -e RUNPOD_API_KEY=your_key -- npx -y @runpod/mcp-server@latest

  # Agregar el servidor MCP Docs de Runpod
  claude mcp add runpod-docs --scope user --transport http https://docs.runpod.io/mcp
  ```

### Ejecutar pruebas

En Claude Code, utilice lenguaje natural:

Ejecutar la prueba flash-quickstart

```
Ejecutar todas las pruebas de vLLM
```

Para validar los cambios en la documentación aún no publicados, utilice el modo con documentos locales:

```
Ejecuta la prueba vllm-deploy usando los documentos locales
```

Claude hará lo siguiente:  
1. Leer la prueba de `tests/TESTS.md`.  
2. Intentar lograr el objetivo utilizando únicamente la documentación.  
3. Limpiar todos los recursos creados (que comiencen con `doc_test_`).  
4. Escribir un informe en `tests/reports/`.  
5. Proponer mejoras en la documentación.

### Definiciones de pruebas

Todos los tests están definidos en [`tests/TESTS.md`](tests/TESTS.md) en forma de tabla.

### Agregar pruebas nuevas

Agregue una fila en la sección correspondiente de `tests/TESTS.md` con los siguientes datos:  
- **ID**: Identificador único de la prueba  
- **Goal**: Una oración que describa lo que desea el usuario  
- **Cleanup**: Tipos de recursos a eliminar (`endpoints`, `pods`, `templates`, `network-volumes` o `none`)

### Informes

Los informes de las pruebas se guardan en `tests/reports/` (ignorados por git) e incluyen:  
- Qué funcionó y qué no funcionó  
- Dónde se atascó el agente  
- Sugerencias específicas para mejorar la documentación
