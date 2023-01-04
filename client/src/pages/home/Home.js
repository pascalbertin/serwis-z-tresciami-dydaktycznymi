// import '../../App.css';
import React from 'react';
import '../../index.css'

const Home = () => {
  const username = localStorage.getItem('username')
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false

  const toggleMenu = () => {
      const menu = document.querySelector("#hamburger-menu")
      const menuToggler = document.querySelector("#menu-toggler")
      if(menu.classList.contains("hidden")){
        menu.classList.remove("hidden")
        menuToggler.setAttribute("aria-expanded", true);
      }
      else {
        menu.classList.add("hidden")
        menuToggler.setAttribute("aria-expanded", false);
      }
  }

  return ( 
    <nav className="bg-second sticky top-0 z-50 px-4 py-6 rounded-b dark:bg-gray-900 font-cabin">
      <div className="nav-wrapper container flex flex-wrap items-center justify-between mx-auto">
        <div className="logo">
          <a href="/" className="flex transition-all hover:opacity-80">
            <svg viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 z-10">
              <ellipse cx="43.3854" cy="43.3856" rx="17.4805" ry="58.0181" transform="rotate(45 43.3854 43.3856)" fill="#2F184B"/>
            </svg>
          
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 md:h-10 absolute md:mt-5 md:ml-5 mt-4 ml-4">
              <ellipse cx="25.8714" cy="25.8635" rx="13.41" ry="33.066" transform="rotate(135 25.8714 25.8635)" fill="#532B88"/>
            </svg>
              
              <span className="pl-4 self-center text-first text-xl md:text-4xl sm:text-2xl font-bold dark:text-white uppercase">Tutors Alpha</span>
          </a>
          </div>
          <button id="menu-toggler" data-collapse-toggle="navbar-default" onClick={() => toggleMenu()} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 nav-toggler" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        <div id="hamburger-menu" className="hidden w-full lg:inline-flex lg:w-auto">
        <div className="lg:ml-auto">
          <ul className="flex flex-col p-4 mt-4 sm:gap-2 lg:gap-4 xl:gap-6 md:flex-row md:space-x-8 md:mt-0 md:hover:text-fourth md:font-medium dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/filter_courses" className="block py-2 pl-3 pr-4 text-first xl:text-2xl lg:text-lg md:text-md transition-all hover:opacity-70 sm:text-md rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">Szukaj kursu</a>
            </li>
            <li>
              {!isLoggedIn ? 
                <a href="/categories" className="block py-2 pl-3 pr-4 text-first rounded xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 transition-all hover:opacity-70 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Kategorie</a>
                : <a href="/profile" className="block py-2 pl-3 pr-4 text-first rounded xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 transition-all hover:opacity-70 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profil ({username})</a>}
            </li>
            <li>
            {!isLoggedIn ? 
              <a href="/register" className="block py-2 pl-3 pr-4 text-first rounded xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 transition-all hover:opacity-70 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Zostań nauczycielem</a>
              : <a href="/user/logout" className="block py-2 pl-3 pr-4 text-first rounded xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 transition-all hover:opacity-70 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wyloguj się</a>}
            </li>
            <li>
            {!isLoggedIn ? 
              <a href="/categories" className="block py-2 pl-3 pr-4 text-first rounded-lg xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 transition-all hover:opacity-70 md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Zacznij naukę!</a>
              : <a href="/addCourse" className="block py-2 pl-3 pr-4 text-first rounded-lg xl:text-2xl lg:text-lg md:text-md sm:text-md hover:bg-gray-100 transition-all hover:opacity-70 md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dodaj kurs</a>}
            </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>

    // <AppBar style={{ position: 'relative', background: '#F4EFFA', zIndex: 1 }}>
    //   <Toolbar>
    //     <a href='/'>
    //       <img classNameName={classNamees.image} src={science} alt="logo" width="110" height="120"></img>
    //     </a>
    //     <a href='/' style={{ textDecoration: 'none' }}>
    //       <Typography classNameName={classNamees.heading} style={{ marginLeft: 8, marginRight: 220, width: '18%', fontSize: "4rem"}} variant='h1' align='left' sx={{ flexGrow: 2 }}>
    //         TUTORS ALPHA
    //       </Typography>
    //     </a>
    //     {!isLoggedIn && <a href='/filter_courses' style={{ textDecoration: 'none' }}>
    //       <Button
    //         classNameName={classNamees.title}>   Szukaj kursu
    //       </Button>
    //     </a>}
    //     {isLoggedIn && <a href='/filter_courses' style={{ textDecoration: 'none' }}>
    //     <Button
    //       classNameName={classNamees.title}>   Szukaj kursu
    //     </Button>
    //   </a>}
    //     {!isLoggedIn && <a href='/categories' style={{ textDecoration: 'none' }}>
    //       <Button
    //         classNameName={classNamees.title}>   Kategorie
    //       </Button>
    //     </a>}
    //     {isLoggedIn && <a href='/profile' style={{ textDecoration: 'none' }}>
    //     <Button
    //       classNameName={classNamees.title}>   Profil ({username})
    //     </Button>
    //   </a>}
        
    //     {!isLoggedIn && <a href='/register' style={{ textDecoration: 'none' }}>
    //       <Button
    //         classNameName={classNamees.title}>   Zostań nauczycielem
    //       </Button>
    //     </a>}
    //     {isLoggedIn && <a href='/user/logout' style={{ textDecoration: 'none' }}>
    //     <Button
    //       classNameName={classNamees.title}>   Wyloguj się
    //     </Button>
    //   </a>}

    //   {isLoggedIn && <a href='/addCourse' style={{ textDecoration: 'none'}}>
    //       <Button
    //         variant="contained"
    //         style={ {borderRadius: 20}}
    //         classNameName={classNamees.titleSecondButton}>   Dodaj kurs
    //       </Button>
    //     </a>}

    //     {!isLoggedIn && <a href='/' style={{ textDecoration: 'none' }}>
    //       <Button
    //         variant="contained"
    //         style={ {borderRadius: 20}}
    //         classNameName={classNamees.titleSecondButton}>   Zacznij naukę!
    //       </Button>
    //     </a>}
    //   </Toolbar>
    // </AppBar>
  );
}

export default Home;
