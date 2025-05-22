// SeedUsers.js (No changes needed if it already aligns with the allowed roles)
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const User = require('../Login/models/User'); // Adjust path as needed
const db = require('../Admin/models'); // Assuming this connects to DB

const seedUsers = async () => {
    try {
        // Ensure your database connection setup here is correct
        await db.mongoose.connect(process.env.DATABASE_URL);
        console.log('Successfully connected to MongoDB for seeding.');

        await User.deleteMany({});
        console.log('Existing users cleared.');

        const users = [
            {
                email: 'admin@ypma.sch.id',
                password: 'admin123',
                role: 'admin',
                username: 'Administrator'
            },
            {
                email: 'kepsek@ypma.sch.id',
                password: 'kepsek456',
                role: 'kepalasekolah',
                username: 'Kepala Sekolah'
            },
        ];

        await User.insertMany(users);
        console.log('Users seeded successfully!');
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedUsers();