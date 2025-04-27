import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        console.log('Submitted', { username, email, password });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-1 bg-[url('/Images/bg-2.jpg')] bg-cover" />
            
            {/* Animated Background Blur */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-black blur-2xl"
            />

            {/* Signup Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 shadow-2xl relative z-10"
            >
                {/* Branding Header */}
                <div className="mb-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2"
                    >
                        VenomGuard AI
                    </motion.h1>
                    <p className="text-gray-400 text-sm font-light">
                        Join our community of wildlife protectors
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg"
                    >
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <UserIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/30 outline-none text-gray-300 placeholder-gray-600 transition-all"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/30 outline-none text-gray-300 placeholder-gray-600 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/30 outline-none text-gray-300 placeholder-gray-600 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                    >
                        Create Account
                    </motion.button>

                    {/* Login Link */}
                    <p className="text-gray-400 text-center mt-8">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-green-400 hover:text-green-300 font-semibold underline underline-offset-4"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Signup;