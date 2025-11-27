const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

console.log('🚀 Starting build process for Cyclic deployment...');

try {
    // Ensure frontend build directory exists
    if (!fs.existsSync('mandiri-project-frontend/build')) {
        console.log('📦 Building React app...');
        
        // Install frontend dependencies
        console.log('📥 Installing frontend dependencies...');
        execSync('cd mandiri-project-frontend && npm install', { stdio: 'inherit' });
        
        // Build React app
        console.log('🔨 Building React app...');
        execSync('cd mandiri-project-frontend && npm run build', { stdio: 'inherit' });
        
        console.log('✅ React app built successfully!');
    } else {
        console.log('✅ React build already exists, skipping build...');
    }
    
    // Install backend dependencies if needed
    if (!fs.existsSync('mandiri-project-backend/node_modules')) {
        console.log('📥 Installing backend dependencies...');
        execSync('cd mandiri-project-backend && npm install', { stdio: 'inherit' });
    }
    
    console.log('🎉 Build process completed successfully!');
    console.log('📁 Project structure ready for Cyclic deployment:');
    console.log('   ├── mandiri-project-frontend/build/ (React production build)');
    console.log('   ├── mandiri-project-backend/ (Node.js backend)');
    console.log('   └── server.js (Main server file)');
    
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}