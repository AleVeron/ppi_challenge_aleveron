# Currency Exchange Calculator

Una aplicación web moderna para convertir monedas en tiempo real, construida con React y TypeScript.

## 🚀 Características

- **Conversión en tiempo real**: Utiliza la API de VATComply para obtener tasas de cambio actualizadas
- **Interfaz intuitiva**: Diseño limpio y responsive que funciona en dispositivos móviles y desktop
- **10 monedas principales**: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD
- **Validación de entrada**: Solo permite números positivos y formato decimal válido
- **Intercambio rápido**: Botón para intercambiar las monedas de origen y destino
- **Enlaces dinámicos**: Enlaces directos a XE.com para más información sobre cada moneda
- **Prevención de duplicados**: No permite seleccionar la misma moneda como origen y destino

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **CSS Modules** para estilos
- **VATComply API** para tasas de cambio
- **Google Fonts** (Inter)

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

## 🏃‍♂️ Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/AleVeron/ppi_challenge_aleveron.git
cd ppi_challenge
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

### 4. Construir para producción
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/`


## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── CurrencyConverter.tsx    # Componente principal con lógica
│   ├── CurrencyCard.tsx         # Formulario y resultados
│   └── CurrencySelector.tsx     # Selector de monedas
├── services/            # Servicios para API
│   └── currencyService.ts       # Integración con VATComply API
├── data/               # Datos estáticos
│   └── currencies.ts           # Lista de monedas disponibles
├── types/              # Definiciones de TypeScript
│   └── index.ts               # Interfaces y tipos
├── assets/             # Recursos estáticos
│   ├── Vector.png             # Icono de intercambio
│   └── favicon.jpg            # Favicon personalizado
└── App.tsx             # Componente raíz
```

## 🌐 API Utilizada

La aplicación utiliza la API gratuita de [VATComply](https://vatcomply.com/) para obtener tasas de cambio en tiempo real:

- **Endpoint**: `https://api.vatcomply.com/rates`
- **Método**: GET
- **Sin autenticación requerida**
- **Límite**: Sin restricciones para uso personal

## 💡 Cómo Usar

1. **Ingresa la cantidad** que deseas convertir en el campo "Amount"
2. **Selecciona la moneda de origen** en el dropdown "From"
3. **Selecciona la moneda de destino** en el dropdown "To"
4. **Ve el resultado** actualizado automáticamente
5. **Usa el botón de intercambio** (⇄) para cambiar las monedas rápidamente
6. **Haz clic en los nombres de las monedas** para obtener más información en XE.com

## 🎨 Características de Diseño

- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Tipografía**: Fuente Inter de Google Fonts
- **Colores**: Esquema de colores profesional
- **Iconografía**: Iconos SVG optimizados
- **Favicon personalizado**: Icono único en las pestañas del navegador

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 🐛 Solución de Problemas

### Error de puerto ocupado
Si el puerto 3000 está ocupado, el sistema te preguntará si quieres usar otro puerto. Responde "Y" para continuar.

### Error de red
Si hay problemas para obtener las tasas de cambio, verifica tu conexión a internet y que la API de VATComply esté disponible.

### Problemas con npm
Si tienes problemas con las dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Demo en Vivo

Puedes ver la aplicación funcionando en: [GitHub Pages](https://aleveron.github.io/ppi_challenge_aleveron/) *(pendiente de configuración)*

## 📸 Capturas de Pantalla

### Vista Desktop
![Desktop View](./screenshots/desktop-view.png) *(pendiente de agregar)*

### Vista Mobile
![Mobile View](./screenshots/mobile-view.png) *(pendiente de agregar)*

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir qué te gustaría cambiar.

### Pasos para contribuir:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

**Desafío desarrollado por Alejo Veron, front-end/mobile developer usando React y TypeScript para la empresa PPI**
