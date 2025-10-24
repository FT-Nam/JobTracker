import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' },
    { name: 'Resumes', href: '/resumes' },
    { name: 'Interviews', href: '/interviews' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-border">
            <h2 className="text-xl font-bold text-primary">JobTracker</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="text-xs text-gray-500 text-center">
              JobTracker v1.0.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
