# MetroWatch AI - Metro Surveillance Dashboard

A comprehensive React-based dashboard for monitoring AI-powered metro surveillance systems. This application provides real-time incident tracking, camera management, and system configuration capabilities for security operators.

## Features

### 🛡️ Security Dashboard
- **Real-time System Overview**: Monitor total cameras, active incidents, and system health at a glance
- **Recent Incidents Feed**: View latest security alerts with thumbnails and quick status updates
- **System Status Monitoring**: Track AI detection, data processing, and alert system health
- **Quick Action Panel**: Fast access to critical system functions

### 🚨 Incident Management
- **AI-Powered Detection**: Track theft, unattended objects, vandalism, and suspicious activities
- **Advanced Filtering**: Search and filter incidents by type, status, camera, or description
- **Real-time Updates**: Instant status changes with visual feedback and notifications
- **Detailed Incident Views**: Camera snapshots, timestamps, and location information

### 📹 Camera Management
- **Live Feed Monitoring**: View camera feeds with real-time health indicators
- **Dynamic Camera Control**: Enable/disable cameras with instant status updates
- **Camera Health Tracking**: Monitor connection status, last ping times, and performance metrics
- **Easy Camera Addition**: Add new cameras with location and feed URL configuration

### ⚙️ System Configuration
- **Alert Threshold Management**: Configure detection sensitivity and alert parameters
- **Notification Channels**: Setup SMS, email, and WhatsApp alert delivery
- **Privacy Controls**: Enable/disable face blur functionality for compliance
- **Test Alert System**: Verify notification channels with test message functionality

### 🎨 Modern UI/UX
- **Premium Design**: Dark/light theme support with sophisticated color schemes
- **Responsive Layout**: Seamless experience across desktop, tablet, and mobile devices
- **Real-time Animations**: Smooth transitions and status indicators with pulsing effects
- **Professional Dashboard**: Security-focused interface optimized for control room environments

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM for navigation
- **Animations**: Framer Motion for smooth UI interactions
- **Icons**: Lucide React for consistent iconography
- **Notifications**: React Toastify for user feedback
- **State Management**: React hooks with context patterns

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/metrowatch-ai.git
   cd metrowatch-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   Navigate to `http://localhost:5173` in your browser

## Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components (Button, Input, Card, etc.)
│   ├── molecules/       # Simple combinations (FormField, SearchBar, etc.)
│   ├── organisms/       # Complex components (Sidebar, CameraCard, etc.)
│   ├── pages/           # Full page components (Dashboard, Incidents, etc.)
│   ├── ui/              # State components (Loading, Error, Empty)
│   └── ApperIcon.jsx    # Icon management component
├── services/
│   ├── api/             # Service layer for data operations
│   └── mockData/        # JSON mock data files
├── utils/               # Utility functions
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Key Components

### Dashboard
- System metrics with gradient cards and trend indicators
- Recent incidents feed with real-time updates
- System status monitoring with color-coded health indicators
- Quick action buttons for common tasks

### Incident Management
- Filterable incident list with advanced search capabilities
- Status management with instant updates and visual feedback
- Camera snapshot integration with fallback handling
- Real-time timestamp formatting and status badges

### Camera Management
- Grid-based camera feed display with health indicators
- Dynamic status controls with confirmation dialogs
- Camera addition form with validation and error handling
- Real-time feed monitoring with offline fallback states

### Settings Panel
- Grouped configuration sections with clear labeling
- Real-time validation and instant feedback
- Test functionality for notification channels
- Reset to defaults with confirmation prompts

## Mock Data Integration

The application uses a comprehensive mock data system that simulates real API responses:

- **Incidents**: Theft, unattended objects, vandalism, and suspicious activity alerts
- **Cameras**: Multi-location camera network with health monitoring
- **Settings**: Configurable alert thresholds and notification preferences

All mock services include realistic delays and error handling to simulate production API behavior.

## Development Guidelines

### Component Architecture
- **Atomic Design**: Components organized by complexity and reusability
- **Props Interface**: Consistent prop patterns with proper TypeScript-style destructuring
- **State Management**: React hooks with proper dependency arrays and cleanup

### Styling Standards
- **Tailwind CSS**: Utility-first approach with custom color system
- **Dark Mode**: Full dark theme support with automatic system detection
- **Responsive Design**: Mobile-first approach with proper breakpoint usage
- **Animation**: Framer Motion for state transitions and micro-interactions

### Code Quality
- **ES6+ Standards**: Modern JavaScript with async/await patterns
- **Import Organization**: Consistent import order with @/ path aliasing
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages
- **Loading States**: Skeleton loaders and loading indicators for all async operations

## Customization

### Theme Configuration
Modify `tailwind.config.js` to customize:
- Color palette and gradients
- Typography scale and font families
- Spacing and border radius values
- Animation timing and easing functions

### Mock Data
Update JSON files in `src/services/mockData/` to customize:
- Incident types and descriptions
- Camera locations and configurations
- Default system settings and preferences

### API Integration
Replace mock services in `src/services/api/` with real API calls:
- Update service methods to use actual endpoints
- Modify response handling for real data structures
- Add authentication headers and error handling

## Performance Optimization

- **Lazy Loading**: Components and routes loaded on demand
- **Image Optimization**: Proper fallback handling and loading states
- **Animation Performance**: Hardware-accelerated transforms and optimized timing
- **Bundle Optimization**: Vite-based build with automatic code splitting

## Security Considerations

- **Input Validation**: All form inputs properly validated and sanitized
- **XSS Prevention**: Proper escaping of user-generated content
- **CSRF Protection**: Token-based protection for state-changing operations
- **Privacy Controls**: Face blur functionality and data anonymization options

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team at support@metrowatch.ai or create an issue in the project repository.