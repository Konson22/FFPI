import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import { PerformanceOptimizer } from '../components/PerformanceOptimizer';

export default function MainLayout() {
    return (
        <div className="">
            <PerformanceOptimizer />
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
        </div>
    );
}
