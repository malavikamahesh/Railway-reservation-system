const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetAdmin() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'railway_reservation',
    port: process.env.DB_PORT || 3306
  });

  try {
    console.log('🔄 Resetting admin account...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Delete existing admin
    await pool.query('DELETE FROM PASSENGER WHERE email = ?', ['admin@railway.com']);
    
    // Insert fresh admin
    await pool.query(
      'INSERT INTO PASSENGER (name, email, phone, age, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      ['System Admin', 'admin@railway.com', '9999999999', 30, hashedPassword, 'admin']
    );
    
    console.log('✅ Admin account reset successfully!');
    console.log('---');
    console.log('Email: admin@railway.com');
    console.log('Password: admin123');
    console.log('---');
  } catch (err) {
    console.error('❌ Error resetting admin:', err.message);
  } finally {
    process.exit();
  }
}

resetAdmin();
