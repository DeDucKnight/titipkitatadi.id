const { Customer, User, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Admin login
exports.admin_login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user.userid, username: user.username  },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        // Send token to the client
        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


// Create admin user
exports.create_user_admin = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with an admin role
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            role: role 
        });

        res.status(201).json({ message: 'Admin user created successfully', user: { username: newUser.username, role: newUser.role } });
    } catch (err) {
        console.error('Error creating admin user:', err);
        res.status(500).json({ error: 'Failed to create admin user' });
    }
};

// Customer login
exports.customer_login = async (req, res) => {
    const { customeremail } = req.body;

    try {
        // Find customer by email
        const customer = await Customer.findOne({ where: { customeremail } });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { customerId: customer.customerid, email: customer.customeremail },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send token to the client
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create customer
exports.create_customer = async (req, res) => {
    const { customeremail, customername } = req.body;

    try {
        // Check if required fields are provided
        if (!customeremail || !customername) {
            return res.status(400).json({ error: 'CustomerEmail and CustomerName are required' });
        }

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ where: { customeremail } });

        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer with this email already exists' });
        }

        // Create new customer
        const customer = await Customer.create({
            customeremail,
            customername,
        });

        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (err) {
        console.error('Error creating customer:', err);
        res.status(500).json({ error: 'Failed to create customer' });
    }
};

// Delete a Customer by Email
exports.delete_customer_by_email = async (req, res) => {
    const { customeremail } = req.params;

    try {
        // Check if customer exists
        const customer = await Customer.findOne({ where: { customeremail } });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Delete customer
        await customer.destroy();

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
};
