import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/login/form';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>
                <p className="text-center text-gray-600 mb-8">Please sign in to your account</p>
                <LoginForm />
                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                        Forgot your password?
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;