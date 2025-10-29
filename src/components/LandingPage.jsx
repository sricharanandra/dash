import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <div className="w-full bg-blue-50">
        <nav className="fixed flex justify-between items-center top-0 left-0 w-full bg-blue-50 z-[1000] px-8 py-4">
          <div className="font-ubuntu font-medium text-[50px] text-dark-bg bg-blue-50">dash</div>
          <div className="bg-blue-50 flex gap-4">
            <Link 
              to="/login"
              className="bg-blue-50 py-2 px-6 border-2 border-solid border-dark-bg rounded hover:bg-dark-bg hover:text-blue-50 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-dark-bg text-blue-50 py-2 px-6 border-2 border-solid border-dark-bg rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <section className="flex flex-col justify-evenly items-center h-screen max-w-full bg-blue-50 text-dark-bg">
          <div className="text-6xl font-bold bg-blue-50 mb-0 text-center px-4">
            Elevate Your Workflow With The Only Productivity App You'll Need
          </div>
          <div className="flex flex-col mb-[300px] p-0 text-2xl text-dark-bg bg-blue-50 text-center px-4">
            <div className="bg-blue-50 p-0.5">
              dash helps you stay on top of your tasks, projects, and life.
            </div>
            <div className="bg-blue-50 p-0.5">
              Say Goodbye To Cluttered Browsers and background apps.
            </div>
            <div className="bg-blue-50 mt-8">
              <Link 
                to="/signup"
                className="inline-block bg-dark-bg text-blue-50 py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors font-bold text-xl"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        <section className="p-5 bg-blue-50 text-dark-bg">
          <div className="bg-blue-50 mb-4">
            dash is the ultimate combination of productivity and simplicity.
            It's designed to make your day easier. With dash, you can manage
            your tasks, days, and projects.
          </div>
          <div className="bg-blue-50">
            dash intergrates into your workflow, it provides a central hub for
            all your needs by bringing all your daily tools, services and apps
            into one place.
          </div>
        </section>

        <footer className="bg-blue-50 text-dark-bg p-5 text-center">
          <p className="bg-blue-50 font-ubuntu text-2xl mb-2">dash</p>
          <a href="https://github.com/sricharanandra/dash" className="bg-blue-50 text-blue-600 hover:underline">GitHub</a>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
