# SQL Data Generator

A modern, feature-rich web application for generating realistic SQL test data with support for multiple database types.

## 🌟 Features

### Core Functionality
- **Multi-Database Support**: Generate SQL for MySQL, PostgreSQL, SQL Server, and SQLite
- **Realistic Data Generation**: Create test data using Faker.js with 30+ data types
- **Table Templates**: Pre-built templates for common use cases (Users, Products, Library, etc.)
- **Advanced Column Configuration**: Support for constraints, custom ranges, and data patterns
- **SQL Export Options**: Generate CREATE, INSERT, Stored Procedures, and Migration scripts

### Modern UI/UX
- **Dark/Light Mode**: Toggle between themes with persistent settings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Visual feedback during data generation
- **Error Handling**: Comprehensive error boundaries and validation
- **Toast Notifications**: User-friendly feedback messages

### Data Types & Patterns
- **Basic Types**: Int, Bigint, Float, Decimal, Money, Date, Time, DateTime
- **Text Types**: Nvarchar, Text, Email, Phone, SSN, Credit Card
- **Business Data**: Company, Job Title, Department, Product Name/Description
- **Location Data**: Address, City, State, Country, Coordinates
- **Technical Data**: IP Address, URL, Username, Password, UUID, MAC Address
- **Custom Patterns**: ISBN, Color, Domain, and more

### Advanced Features
- **History Tracking**: Keep track of generated SQL scripts
- **Copy to Clipboard**: One-click SQL copying
- **File Download**: Export SQL scripts as files
- **Syntax Highlighting**: Beautiful SQL code display
- **Form Validation**: Real-time validation and error messages
- **Admin/User Roles**: Different limits and features based on role

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sql-data-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Bootstrap 5**: Responsive UI framework
- **React Hook Form**: Form handling and validation
- **React Query**: Data fetching and caching
- **React Icons**: Beautiful icon library
- **React Syntax Highlighter**: Code syntax highlighting
- **React Hot Toast**: Toast notifications
- **Faker.js**: Realistic data generation

### Development Tools
- **React Error Boundary**: Error handling
- **React Router**: Navigation (ready for future expansion)
- **Webpack Bundle Analyzer**: Bundle optimization

## 📁 Project Structure

```
src/
├── components/
│   ├── ModernApp.js          # Main application component
│   ├── Navigation.js          # Modern navigation bar
│   ├── ColumnConfig.js        # Column configuration form
│   ├── SQLResult.js           # SQL output display
│   ├── TableTemplates.js      # Pre-built table templates
│   ├── LoadingSpinner.js      # Loading indicators
│   └── ErrorBoundary.js       # Error handling
├── contexts/
│   └── ThemeContext.js        # Dark/light mode context
├── utils/
│   ├── dataGenerators.js      # Enhanced data generation
│   └── sqlGenerators.js       # Multi-database SQL generation
└── index.css                  # Modern styling with dark mode
```

## 🎨 UI Improvements

### Modern Design
- Clean, professional interface
- Consistent spacing and typography
- Smooth animations and transitions
- Accessible color contrast
- Mobile-first responsive design

### Dark Mode
- Automatic theme detection
- Persistent theme preference
- Consistent styling across all components
- Reduced eye strain in low-light environments

### User Experience
- Intuitive navigation with icons
- Clear visual hierarchy
- Helpful tooltips and labels
- Responsive feedback for all interactions
- Progressive disclosure of advanced features

## 🔧 Configuration

### Database Types
- **MySQL**: Full support with InnoDB engine
- **PostgreSQL**: Native PostgreSQL syntax
- **SQL Server**: T-SQL specific features
- **SQLite**: Lightweight database support

### Data Generation
- **Realistic Patterns**: Email, phone, SSN, credit card formats
- **Custom Ranges**: Integer ranges with min/max values
- **Custom Lists**: Space-separated custom data lists
- **Constraints**: Primary key, unique, and foreign key support

### Templates
- **Users Management**: Authentication and user data
- **E-commerce Products**: Product catalog with pricing
- **Library Management**: Books and authors
- **Healthcare Records**: Patient and medical data
- **Manufacturing**: Inventory and production tracking
- **Education System**: Students and courses

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform

## 🔮 Future Enhancements

### Planned Features
- **Collaboration**: Share table configurations
- **Version Control**: Track configuration changes
- **API Integration**: REST API for programmatic access
- **Plugin System**: Third-party data generators
- **Analytics Dashboard**: Usage statistics
- **Bulk Operations**: Generate data for multiple tables
- **Advanced Relationships**: Foreign key relationships
- **Data Export**: JSON, CSV, Excel formats

### Technical Improvements
- **TypeScript**: Full TypeScript migration
- **Testing**: Comprehensive unit and integration tests
- **Performance**: Code splitting and lazy loading
- **PWA**: Progressive Web App capabilities
- **Offline Support**: Service worker implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Faker.js**: For realistic data generation
- **Bootstrap**: For responsive UI components
- **React Community**: For excellent documentation and tools
- **Font Awesome**: For beautiful icons

---

**SQL Data Generator** - Making database testing easier and more realistic since 2024.
