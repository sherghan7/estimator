# High-End Estimator App
A professional-grade project estimator application built with Node.js and Express that allows users to create detailed estimates for various services with a modern, robotic UI.

## 🚀 Features
### Comprehensive Estimate Builder
- Select from multiple service categories and sub-services
- Add contributors with predefined hourly rates
- Dynamically add custom tasks
- Add detailed notes for each service item

### Advanced Database System
- MySQL database with structured service categories
- Pre-loaded seed data for common services
- Real-time database updates

### Export Capabilities
- Generate estimates in JSON format
- Export to Excel with formatted worksheets

### Futuristic UI Design
- Clean, robotic aesthetic with animations
- Responsive layout for all devices
- Real-time calculation updates

## 📋 Technologies Used
- **Backend:** Node.js, Express
- **Database:** MySQL, Sequelize ORM
- **Frontend:** Pug templates, CSS, JavaScript
- **Export Tools:** ExcelJS
- **Other:** dotenv, morgan, cors

## 💻 Installation
### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)

### Setup Steps
1. Clone the repository
   ```sh
   git clone https://github.com/sherghan7/estimator-app.git
   cd estimator-app
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Configure environment variables
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASS=your_mysql_password
   DB_NAME=estimator_db
   PORT=3000
   ```
4. Create the database
   ```sh
   mysql -u root -p
   ```
   Within the MySQL shell:
   ```sql
   CREATE DATABASE estimator_db;
   EXIT;
   ```
5. Initialize the database with seed data
   ```sh
   npm run setup
   ```
6. Start the application
   - Development mode with auto-reload:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm start
     ```
7. Access the application
   Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

## 🎮 Usage Guide
### Creating a New Estimate
1. Click "Create New Estimate" on the home page
2. Fill in the estimate title and client information
3. Add service items by selecting from the available services
4. Choose sub-services and assign contributors
5. Specify the estimated hours for each service
6. Add notes for additional context
7. Click "Create Estimate" to save

### Managing Estimates
- View all estimates on the "Estimates" page
- Click on any estimate to view its details
- Export estimates to JSON or Excel format using the export buttons

### Adding New Services
- Use the API endpoints to add new services, sub-services, or contributors
- New additions will be available immediately in the estimate builder

## 📁 Project Structure
```
estimator-app/
├── config/                 # Configuration files
├── controllers/            # Request handlers
├── models/                 # Database models
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── img/                # Images
├── routes/                 # Route definitions
├── utils/                  # Utility functions
├── views/                  # Pug templates
├── app.js                  # Main application file
└── package.json            # Project metadata
```

## 🔌 API Endpoints
### Services
- `GET /api/services` - Get all services with their sub-services
- `GET /api/services/contributors` - Get all contributors
- `POST /api/services` - Add a new service
- `POST /api/services/subservice` - Add a new sub-service
- `POST /api/services/contributor` - Add a new contributor

### Estimates
- `GET /api/estimates` - Get all estimates
- `GET /api/estimates/:id` - Get a specific estimate
- `POST /api/estimates` - Create a new estimate
- `GET /api/estimates/:id/export/json` - Export estimate as JSON
- `GET /api/estimates/:id/export/excel` - Export estimate as Excel

## ⚙️ Configuration
### Database Schema
#### Service
- `id`: Primary key
- `name`: Service name
- `description`: Service description
- `category`: Service category

#### SubService
- `id`: Primary key
- `name`: Sub-service name
- `description`: Sub-service description
- `estimatedHours`: Default estimated hours
- `serviceId`: Foreign key to Service

#### Contributor
- `id`: Primary key
- `name`: Contributor name
- `role`: Contributor role
- `hourlyRate`: Hourly rate in USD

#### Estimate
- `id`: Primary key
- `title`: Estimate title
- `clientName`: Client name
- `description`: Project description
- `estimatedTotal`: Total estimated amount
- `items`: JSON array of service items
- `createdAt`: Creation timestamp

### Customization
- **Visual Appearance:** Modify the CSS files in `public/css/`
- **Available Services:** Update the seed data in `utils/seedDatabase.js`
- **Estimate Structure:** Modify the Estimate model in `models/Estimate.js`

## 📊 Data Visualization
The application provides visual representations of estimate data:
- Summary table with total hours and cost
- Individual service item breakdown
- Export options for further analysis

## 🔒 Security
The application implements:
- Input validation and sanitization
- Security best practices for database connections
- Protected API endpoints

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact
For questions or support, please contact [sherghan7@example.com](mailto:sherghan7@example.com).

## 📸 Screenshots
- Home Page
- Estimate Builder
- Estimate View

Built with ❤️ by Sher Ghan

