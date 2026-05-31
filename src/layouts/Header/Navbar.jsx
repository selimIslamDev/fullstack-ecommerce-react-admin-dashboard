import React, { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../../App";
import { useAuth } from "../../context/AuthContext";
import { Search, Sun, Bell, Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isToggleSidebar, themeMode, setThemeMode, setIsToggleSidebar } = useContext(MyContext);
  const { isLoggedIn, user, logout } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { id: 1, name: "Mahmudul", action: "added to his favorite list", item: "Leather belt steve madden", time: "2 min ago", unread: true },
    { id: 2, name: "Rakib Hasan", action: "placed a new order for", item: "Nike Air Max 2024", time: "15 min ago", unread: true },
    { id: 3, name: "Sumaiya Akter", action: "left a review on", item: "Samsung Galaxy S24", time: "1 hour ago", unread: false },
    { id: 4, name: "Tanvir Ahmed", action: "added to his favorite list", item: "Sony WH-1000XM5", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  // Avatar — user name এর প্রথম অক্ষর
  const avatarLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100/80 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">

      {/* Left: Logo + Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsToggleSidebar(!isToggleSidebar)}
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-all">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <span className="font-black text-lg tracking-tight text-gray-800 hidden sm:block">
            HOT<span className="text-blue-600">ASH</span>
          </span>
        </Link>
      </div>

      {/* Middle: Search */}
      <div className={`flex-1 max-w-sm mx-4 hidden sm:block transition-all duration-300 ${searchFocused ? "max-w-md" : ""}`}>
        <div className={`relative flex items-center rounded-2xl border-2 transition-all duration-200 ${searchFocused ? "border-blue-400 bg-white shadow-sm shadow-blue-100" : "border-transparent bg-gray-100"}`}>
          <Search size={16} className={`absolute left-3 transition-colors ${searchFocused ? "text-blue-500" : "text-gray-400"}`} />
          <input
            type="text"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm placeholder-gray-400 outline-none text-gray-700"
            placeholder="Search products, orders..."
          />
          <kbd className={`absolute right-3 text-[10px] px-1.5 py-0.5 rounded-md font-mono transition-all ${searchFocused ? "hidden" : "text-gray-400 bg-gray-200"}`}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 md:gap-2">

        {/* Theme Toggle */}
        <button
          onClick={() => setThemeMode && setThemeMode(themeMode === "dark" ? "light" : "dark")}
          className="p-2.5 text-gray-500 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
        >
          <Sun size={18} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileOpen(false); }}
            className={`relative p-2.5 rounded-xl transition-all ${isNotificationOpen ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                  <p className="text-xs text-gray-400">{unreadCount} unread messages</p>
                </div>
                <button onClick={() => setIsNotificationOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                  <X size={14} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? "bg-blue-50/30" : ""}`}>
                    <div className="relative flex-shrink-0">
                      <img src={`https://i.pravatar.cc/150?u=${notif.id}`} alt="" className="w-9 h-9 rounded-xl object-cover" />
                      {notif.unread && (
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-800">{notif.name}</span> {notif.action}{" "}
                        <span className="font-semibold text-gray-700">"{notif.item}"</span>
                      </p>
                      <p className="text-[10px] text-blue-500 font-medium mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-50">
                <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200 active:scale-[0.98]">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

       
        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />

        {/* Profile / Sign In */}
        {isLoggedIn ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false); }}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-all group"
            >
              {/* Avatar — name এর প্রথম অক্ষর */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-100">
                {avatarLetter}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight">{user?.name}</p>
                <p className="text-[10px] text-gray-400">{user?.email}</p>
              </div>
              <ChevronDown size={14} className={`text-gray-400 hidden lg:block transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {/* Profile Info */}
                <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {avatarLetter}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{user?.name}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[120px]">{user?.email}</p>
                  </div>
                </div>
                <div className="p-2">
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors font-medium">
                    <User size={14} /> My Profile
                  </Link>
                  <Link to="/settings" onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors font-medium">
                    <Settings size={14} /> Settings
                  </Link>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:shadow-md hover:shadow-blue-200 transition-all active:scale-95"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;












