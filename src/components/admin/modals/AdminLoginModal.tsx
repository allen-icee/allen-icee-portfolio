import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useToast } from '../components/AdminToast';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addToast('Logged in successfully', 'success');
      onClose();
      navigate('/admin');
    } catch (err: any) {
      addToast(err.message || 'Failed to login', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-gray-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Admin Access</h2>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <Icon icon="lucide:x" className="w-5 h-5 opacity-60" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                    placeholder="admin@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      <Icon icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <Icon icon="lucide:loader-2" className="w-4 h-4 animate-spin" />
                  ) : (
                    'Authenticate'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
