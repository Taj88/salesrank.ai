import React, { useState, useEffect } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    // Create state array to track hover state for each link
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    // State to control mobile menu visibility
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Track screen width for proper mobile detection
    const [isMobile, setIsMobile] = useState(false);

    // Navigation items
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Consulting', path: '/consulting' },
        { name: 'AI Coach', path: '/ai-coach' }
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Handle resize to properly detect mobile vs desktop
    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth < 768;
            setIsMobile(mobileView);
            // Close mobile menu when resizing to desktop
            if (!mobileView && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        // Initial check
        handleResize();

        // Force mobile detection on first render
        setIsMobile(window.innerWidth < 768);

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // For debugging
    useEffect(() => {
        console.log("Mobile view:", isMobile);
        console.log("Mobile menu open:", mobileMenuOpen);
    }, [isMobile, mobileMenuOpen]);

    return (
        <div className="min-h-screen relative">
            {/* Gradient background */}
            <div
                className="fixed inset-0 w-full h-full bg-gradient-to-br from-white via-[#f8fafc] to-[#e0e7ef] -z-30"
                aria-hidden="true"
            ></div>

            {/* Background noise overlay */}
            <img
                src="/Background Noise.svg"
                alt="background noise"
                className="fixed inset-0 w-full h-full object-cover -z-20 opacity-[0.06]"
                aria-hidden="true"
            />

            {/* Gradient overlay */}
            <div
                className="fixed inset-0 w-full h-full bg-gradient-to-br from-[#c7d2e7]/90 via-[#f6fafd]/40 to-[#ffffff]/80 -z-10"
                aria-hidden="true"
            ></div>

            {/* Navbar */}
            <nav className="relative z-10 h-[108px] mx-auto" style={{ maxWidth: '1440px' }}>
                {/* Mobile View */}
                {isMobile ? (
                    <div className="w-full h-full flex items-center justify-between px-6">
                        {/* Logo */}
                        <img src="/Logo.svg" alt="SalesRank.ai Logo" className="h-8" />

                        {/* Mobile menu toggle button */}
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-md bg-white hover:bg-gray-100 mr-2"
                            onClick={toggleMobileMenu}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            style={{ marginRight: '8px', zIndex: 30 }}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger menu icon */}
                            {mobileMenuOpen ? (
                                /* X icon when menu is open */
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#010205]">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                /* Hamburger icon when menu is closed */
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#010205]">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-between px-6">
                        {/* Original inner section with exact dimensions */}
                        <div className="w-[711px] h-[48px] flex items-center justify-between">
                            {/* Logo */}
                            <img src="/Logo.svg" alt="SalesRank.ai Logo" className="h-8" />

                            {/* Navigation Links section with exact dimensions */}
                            <div className="w-[398px] h-[18px] flex items-center justify-between"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '14px'
                                }}>
                                {navItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.path}
                                        className="no-underline transition-colors duration-200"
                                        style={{
                                            color: hoveredLink === index ? '#3B82F6' : '#020407'
                                        }}
                                        onMouseEnter={() => setHoveredLink(index)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Original Button with exact specifications */}
                        <button
                            className="w-[156px] h-[48px] rounded-[50px] bg-transparent text-[#010205] border border-[#010205]"
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile menu - Moved outside of nav element completely */}
            {isMobile && mobileMenuOpen && (
                <div
                    id="mobile-menu"
                    style={{
                        position: 'fixed',
                        top: '108px',
                        left: 0,
                        width: '100%',
                        height: 'calc(100vh - 108px)',
                        backgroundColor: '#FFFFFF',
                        zIndex: 9999,
                        padding: '24px',
                        overflow: 'auto',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <div className="flex flex-col items-center">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className="no-underline py-4 text-center w-full"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    color: '#020407',
                                    marginBottom: '24px',
                                    display: 'block'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}

                        {/* Mobile button */}
                        <div className="flex justify-center mt-6 w-full">
                            <button
                                className="w-[156px] h-[48px] rounded-[50px] bg-transparent text-[#010205] border border-[#010205]"
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Intro Section - Conditionally render based on mobile vs desktop */}
            {isMobile ? (
                <section
                    id="intro-mobile"
                    className="relative z-10 px-6 mx-auto"
                    style={{
                        marginTop: '40px',
                    }}
                >
                    {/* Text section for mobile */}
                    <div
                        className="text-component"
                        style={{
                            position: 'relative',
                            width: '100%',
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: '40px',
                            lineHeight: '1.2',
                            color: '#111111',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}
                    >
                        Your AI-Powered Sales Coach
                    </div>

                    {/* Small robot icon centered on mobile */}
                    <div className="flex justify-center my-6">
                        <img
                            src="/robot.svg"
                            alt="Robot icon"
                            style={{
                                width: '120px',
                                height: 'auto',
                                opacity: '100%'
                            }}
                        />
                    </div>

                    {/* Subtext section for mobile */}
                    <div
                        className="subtext-component"
                        style={{
                            width: '100%',
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: '18px',
                            lineHeight: '163%',
                            color: 'rgba(5, 19, 29, 0.7)',
                            marginBottom: '30px',
                            textAlign: 'center'
                        }}
                    >
                        Get real-time coaching, script suggestions, and deal-closing strategies powered by advanced AI technology.
                    </div>

                    {/* White rectangle mobile */}
                    <div
                        className="mx-auto my-8"
                        style={{
                            width: '90%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                            padding: '30px',
                        }}
                    >
                        {/* Numbers container with space-between */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/* Left number */}
                            <div
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '40px',
                                    color: '#00245F',
                                }}
                            >
                                721+
                            </div>

                            {/* Right number */}
                            <div
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '40px',
                                    color: '#00245F',
                                }}
                            >
                                1000+
                            </div>
                        </div>

                        {/* Growth text */}
                        <div
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 600,
                                fontSize: '24px',
                                color: '#05131D',
                                marginTop: '30px',
                                marginBottom: '16px'
                            }}
                        >
                            Growth is our priority.
                        </div>

                        {/* Description text */}
                        <div
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '16px',
                                color: 'rgba(5, 19, 29, 0.7)',
                                lineHeight: '163%',
                            }}
                        >
                            As a full-service business agency, we specialize in helping companies of all sizes optimize their operations
                        </div>
                    </div>

                    {/* Mobile stats sections */}
                    <div className="flex flex-col space-y-6 my-8">
                        {/* First stat section */}
                        <div
                            className="flex items-center"
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        >
                            {/* White rectangle with icon */}
                            <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '15px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'
                                    }}
                                />
                                <img
                                    src="/backup_table.svg"
                                    alt="Backup Table"
                                    style={{
                                        position: 'absolute',
                                        width: '40px',
                                        height: '40px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            </div>

                            {/* Stats text */}
                            <div className="ml-4">
                                <div
                                    style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '30px',
                                        lineHeight: '110%',
                                        color: '#05131D',
                                    }}
                                >
                                    2000+
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        lineHeight: '163%',
                                        color: 'rgba(5, 19, 29, 0.7)',
                                    }}
                                >
                                    Your protection
                                </div>
                            </div>
                        </div>

                        {/* Second stat section */}
                        <div
                            className="flex items-center"
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        >
                            {/* White rectangle with icon */}
                            <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '15px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'
                                    }}
                                />
                                <img
                                    src="/atr.svg"
                                    alt="attribute"
                                    style={{
                                        position: 'absolute',
                                        width: '40px',
                                        height: '40px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            </div>

                            {/* Stats text */}
                            <div className="ml-4">
                                <div
                                    style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '30px',
                                        lineHeight: '110%',
                                        color: '#05131D',
                                    }}
                                >
                                    7001+
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'Manrope, sans-serif',
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        lineHeight: '163%',
                                        color: 'rgba(5, 19, 29, 0.7)',
                                    }}
                                >
                                    Provide tailored
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Big robot image for mobile */}
                    <div className="flex justify-center my-6">
                        <img
                            src="/big robot.png"
                            alt="Large robot illustration"
                            style={{
                                width: '80%',
                                height: 'auto',
                                maxWidth: '350px',
                                opacity: '100%'
                            }}
                        />
                    </div>
                </section>
            ) : (
                <section
                    id="intro"
                    className="relative z-10 mx-auto"
                    style={{
                        marginTop: '82px',
                        width: '1442px',
                        height: '750px',
                        maxWidth: '100%' // This ensures it doesn't cause horizontal overflow on smaller screens
                    }}
                >
                    {/* New white rectangle div with drop shadow */}
                    <div
                        className="absolute"
                        style={{
                            left: '692.19px',
                            top: '391px',
                            width: '387px', // Reduced from 467px by 80px
                            height: '279px', // Reduced from 359px by 80px
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                            opacity: '100%',
                            padding: '40px',
                        }}
                    >
                        {/* Numbers container with space-between */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/* Left number */}
                            <div
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 600, // SemiBold
                                    fontSize: '50px', // Updated from 40px to 50px
                                    color: '#00245F', // Updated from #05131D to #00245F
                                }}
                            >
                                721+
                            </div>

                            {/* Right number - aligned to right */}
                            <div
                                style={{
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 600, // SemiBold
                                    fontSize: '50px', // Updated from 40px to 50px
                                    color: '#00245F', // Updated from #05131D to #00245F
                                }}
                            >
                                1000+
                            </div>
                        </div>

                        {/* Growth text */}
                        <div
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 600, // SemiBold
                                fontSize: '28px', // Updated from 24px to 28px based on the image showing 27.98px
                                color: '#05131D',
                                marginTop: '36px',
                                marginBottom: '16px'
                            }}
                        >
                            Growth is our priority.
                        </div>

                        {/* Description text */}
                        <div
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '17px',
                                color: 'rgba(5, 19, 29, 0.7)',
                                lineHeight: '163%',
                                maxWidth: '307px', // 387px - 40px*2 (padding)
                                marginTop: '36px' // Changed from 16px to 36px
                            }}
                        >
                            As a full-service business agency, we specialize in helping companies of all sizes optimize their operations
                        </div>
                    </div>

                    {/* Text section based on Figma specs */}
                    <div
                        className="text-component"
                        style={{
                            position: 'relative',
                            left: '-0.19px',
                            top: '18px',
                            width: '516px',
                            height: '327px',
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: '80px',
                            lineHeight: '1.2',
                            color: '#111111',
                            opacity: '100%'
                        }}
                    >
                        Your AI-Powered Sales Coach
                    </div>

                    {/* Subtext section based on provided specs */}
                    <div
                        className="subtext-component"
                        style={{
                            position: 'absolute',
                            left: '272.19px',
                            top: '400px',
                            width: '346px',
                            height: '132px',
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500, // Medium
                            fontSize: '20px',
                            lineHeight: '163%',
                            color: 'rgba(5, 19, 29, 0.7)',
                            opacity: '100%'
                        }}
                    >
                        Get real-time coaching, script suggestions, and deal-closing strategies powered by advanced AI technology.
                    </div>

                    {/* New section with provided specs */}
                    <div
                        className="new-section"
                        style={{
                            position: 'absolute',
                            left: '0.19px',
                            top: '661.11px',
                            width: '288px',
                            height: '88.89px'
                        }}
                    >
                        {/* Container for Rectangle and backup_table.svg */}
                        <div style={{ position: 'relative', width: '89px', height: '86.78px' }}>
                            {/* White rectangle with drop shadow as per the screenshot */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '89px',
                                    height: '86.78px',
                                    backgroundColor: '#FFFFFF',
                                    opacity: '100%',
                                    borderRadius: '15.57px',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'  // Drop shadow effect
                                }}
                            />

                            {/* backup_table.svg positioned on top of Rectangle */}
                            <img
                                src="/backup_table.svg"
                                alt="Backup Table"
                                style={{
                                    position: 'absolute',
                                    width: '55.71px',
                                    height: '55.71px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        </div>

                        {/* Text div in top right corner with new specs */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                width: '151.3px',
                                height: '50.06px',
                                fontFamily: 'Manrope, sans-serif',
                                fontWeight: 600, // SemiBold
                                fontSize: '40px',
                                lineHeight: '110%',
                                color: '#05131D',
                                opacity: '100%'
                            }}
                        >
                            2000+
                        </div>

                        {/* Text div in bottom right corner */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                width: '165px',
                                height: '33px',
                                fontFamily: 'Manrope, sans-serif',
                                fontWeight: 500, // Medium
                                fontSize: '20px',
                                lineHeight: '163%',
                                color: 'rgba(5, 19, 29, 0.7)', // #05131D with 70% opacity
                            }}
                        >
                            Your protection
                        </div>
                    </div>

                    {/* Duplicated section positioned to the right */}
                    <div
                        className="new-section-duplicate"
                        style={{
                            position: 'absolute',
                            left: '343.19px', // Original 0.19px + width 288px + 20px spacing
                            top: '661.11px',
                            width: '288px',
                            height: '88.89px'
                        }}
                    >
                        {/* Container for Rectangle and backup_table.svg */}
                        <div style={{ position: 'relative', width: '89px', height: '86.78px' }}>
                            {/* White rectangle with drop shadow as per the screenshot */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '89px',
                                    height: '86.78px',
                                    backgroundColor: '#FFFFFF',
                                    opacity: '100%',
                                    borderRadius: '15.57px',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'  // Drop shadow effect
                                }}
                            />

                            {/* backup_table.svg positioned on top of Rectangle */}
                            <img
                                src="/atr.svg"
                                alt="attribute"
                                style={{
                                    position: 'absolute',
                                    width: '55.71px',
                                    height: '55.71px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        </div>

                        {/* Text div in top right corner with new specs */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                width: '151.3px',
                                height: '50.06px',
                                fontFamily: 'Manrope, sans-serif',
                                fontWeight: 600, // SemiBold
                                fontSize: '40px',
                                lineHeight: '110%',
                                color: '#05131D',
                                opacity: '100%'
                            }}
                        >
                            7001+
                        </div>

                        {/* Text div in bottom right corner */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                width: '165px',
                                height: '33px',
                                fontFamily: 'Manrope, sans-serif',
                                fontWeight: 500, // Medium
                                fontSize: '20px',
                                lineHeight: '163%',
                                color: 'rgba(5, 19, 29, 0.7)', // #05131D with 70% opacity
                            }}
                        >
                            Provide tailored
                        </div>
                    </div>

                    {/* Big robot image */}
                    <img
                        src="/big robot.png"
                        alt="Large robot illustration"
                        className="absolute"
                        style={{
                            right: '0',
                            top: '0',
                            width: '583px',
                            height: '628px',
                            left: '858.81px',
                            zIndex: '-1',
                            opacity: '100%'
                        }}
                    />

                    {/* Small robot icon */}
                    <img
                        src="/robot.svg"
                        alt="Robot icon"
                        className="absolute"
                        style={{
                            left: '0.19px',
                            top: '371px',
                            width: '204px',
                            height: '198px',
                            opacity: '100%'
                        }}
                    />
                </section>
            )}

            <div className="relative z-0">
                {isMobile ? (
                    <section
                        id="chat-mobile"
                        className="relative z-10 px-6 mx-auto"
                        style={{
                            height: '860px',
                            marginTop: '40px',
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center bg-[#14387F] backdrop-blur-sm rounded-2xl border border-gray-200/50">
                            <div
                                id="chatbox-mobile"
                                className="w-full h-full"
                                style={{
                                    maxWidth: '100%',
                                    padding: '20px'
                                }}
                            >
                            </div>
                        </div>
                    </section>
                ) : (
                    <section
                        id="chat"
                        className="relative z-10 mx-auto"
                        style={{
                            height: '860px',
                            maxWidth: '100%',
                            marginTop: '40px'
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center bg-[#14387F] backdrop-blur-sm rounded-2xl border border-gray-200/50">
                            <div
                                id="chatbox"
                                className="w-full h-full"
                                style={{
                                    width: '1442px',
                                    height: '860px',
                                    maxWidth: '100%'
                                }}
                            >
                                <div
                                    id="text"
                                    className="w-full"
                                    style={{
                                        height: '117px',
                                        position: 'relative',
                                        top: 0,
                                        marginTop: '56px',
                                        paddingLeft: '24px'
                                    }}
                                >
                                    <div className="px-6">
                                        <div
                                            className="text-[#FCE38A]"
                                            style={{
                                                fontFamily: "'Questrial', sans-serif",
                                                fontWeight: 400,
                                                fontSize: '24px'
                                            }}
                                        >
                                            Live AI Coach
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "'Questrial', sans-serif",
                                                fontWeight: 400,
                                                fontSize: '60px',
                                                color: '#FFFFFF',
                                                marginTop: '8px'
                                            }}
                                        >
                                            Take a Suggestion Coaching
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="content-area"
                                    className="w-full"
                                    style={{
                                        width: '1442px',
                                        height: '577px',
                                        marginTop: '60px',
                                        maxWidth: '100%'
                                    }}
                                >
                                    <div
                                        id="content-box"
                                        className="rounded"
                                        style={{
                                            width: '787px',
                                            height: '577px',
                                            backgroundColor: '#F2F3F3',
                                            border: '1px solid #CDCDCD',
                                            position: 'relative',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        <div
                                            id="content-header"
                                            className="w-full"
                                            style={{
                                                height: '62px',
                                                position: 'relative',
                                                top: 0,
                                                backgroundColor: '#FFFFFF',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontFamily: "'Manrope', sans-serif",
                                                    fontWeight: 700, // Bold as shown in the image
                                                    fontSize: '18px', // 18px as shown in the image
                                                    color: '#1B1B1B', // Color #1B1B1B as shown in the image
                                                    paddingLeft: '24px'
                                                }}
                                            >
                                                AI Sales Coach
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {children}
            </div>
        </div>
    );
}