import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaSpinner } from 'react-icons/fa';

import { Button } from '@/components/base/button';
import { ButtonIcon } from '@/components/base/button-icon';
import { Input } from '@/components/base/input';
import AuthService from '@/services/auth';

export const SignIn: React.FC = () => {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInOrRegister = async () => {
    setIsLoading(true);

    try {
      let user;
      if (isRegister) {
        user = await AuthService.signUp(email, password);
      } else {
        user = await AuthService.signIn(email, password);
      }

      if (user) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <FaSpinner className="animate-spin h-12 w-12 text-gray-600" />
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isRegister ? 'Create an account' : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-3 px-5"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-3 px-5"
              />
            </div>
          </div>

          <div>
            <Button
              onClick={handleSignInOrRegister}
              text={isRegister ? 'Register' : 'Sign In'}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {isRegister ? 'Or register with' : 'Or sign in with'}
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <ButtonIcon
            onClick={() => {}}
            icon={FaGoogle}
            srText={isRegister ? 'Register with Google' : 'Sign in with Google'}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          />
          <ButtonIcon
            onClick={() => {}}
            icon={FaFacebook}
            srText={
              isRegister ? 'Register with Facebook' : 'Sign in with Facebook'
            }
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          />
          <ButtonIcon
            onClick={() => {}}
            icon={FaTwitter}
            srText={
              isRegister ? 'Register with Twitter' : 'Sign in with Twitter'
            }
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a
            href="#"
            onClick={toggleForm}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {isRegister ? 'Sign in' : 'Register'}
          </a>
        </p>
      </div>
    </div>
  );
};
