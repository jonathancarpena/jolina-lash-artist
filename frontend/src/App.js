import { useEffect } from 'react';
import moment from 'moment';
// Router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from './redux/features/admin/adminSlice';
import { refresh } from './redux/features/available/availableSlice'

// Components
import Layout from './components/Layout'

// Pages
import Home from './pages'
import About from './pages/about'
import Contact from './pages/contact'
import Booking from './pages/booking'
import BookingSuccess from './pages/booking/success'
import AllServices from './pages/services'
import SingleService from './pages/services/category'
import SingleCategoryService from './pages/services/category/[id]'
import TermsAndConditions from './pages/termsConditions'
import AfterCare from './pages/afterCare'
import NotFound from './pages/404'


// Admin Pages
import Admin from './pages/admin'
import AdminDashboard from './pages/admin/dashboard';
import AdminServices from './pages/admin/services'
import AdminSingleService from './pages/admin/services/[id]'
import AdminBookings from './pages/admin/bookings'
import AdminSingleBooking from './pages/admin/bookings/[id]'
import AdminCalendar from './pages/admin/calendar'
import AdminAccount from './pages/admin/account'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { ready } = useSelector((state) => state.admin)
  if (!ready) {
    navigate('/')
  }
  return (
    <>
      {children}
    </>
  )
}
function App() {
  const dispatch = useDispatch()
  const { ready, expires } = useSelector(state => state.admin)
  const location = useLocation()
  useEffect(() => {
    if (ready) {
      const today = moment(Date.now())
      const expirationDate = moment(expires)
      if (expirationDate.isBefore(today)) {
        dispatch(clearAuth())
      }
    }
  }, [ready, expires, dispatch])

  useEffect(() => {
    dispatch(refresh())
  }, [location])

  return (
    <Layout>
      <Routes>

        {/* 404 */}
        <Route path='*' element={<NotFound />} />

        {/* Landing  */}
        <Route exact path='/' element={<Home />} />

        {/* About  */}
        <Route exact path='/about' element={<About />} />

        {/* Contact  */}
        <Route exact path='/contact' element={<Contact />} />

        {/* Booking */}
        <Route exact path='/booking' element={<Booking />} />

        {/* Success */}
        <Route exact path='/booking/success/:booking_id' element={<BookingSuccess />} />

        {/* All Services  */}
        <Route exact path='/services' element={<AllServices />} />

        {/* Single  Service */}
        <Route exact path='/services/:category' element={<SingleService />} />

        {/* Single Category Service */}
        <Route exact path='/services/:category/:name/:_id' element={<SingleCategoryService />} />

        {/* Terms and Conditions  */}
        <Route exact path='/terms-and-conditions' element={<TermsAndConditions />} />

        {/* After Care  */}
        <Route exact path='/after-care' element={<AfterCare />} />

        {/* Admin */}
        <Route exact path="/admin" element={<Admin />} />

        {/*  */}
        {/* Protected Routes */}
        {/*  */}

        {/* Dashboard */}
        <Route exact path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* Services */}
        <Route exact path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />

        {/* Single Service */}
        <Route exact path="/admin/services/:category/:name/:_id"
          element={
            <ProtectedRoute>
              <AdminSingleService />
            </ProtectedRoute>
          }
        />

        {/* Bookings */}
        <Route exact path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        {/* Single Booking */}
        <Route exact path="/admin/bookings/:number/:_id"
          element={
            <ProtectedRoute>
              <AdminSingleBooking />
            </ProtectedRoute>
          }
        />

        {/* Calendar */}
        <Route exact path="/admin/calendar"
          element={
            <ProtectedRoute>
              <AdminCalendar />
            </ProtectedRoute>
          }
        />

        {/* Account */}
        <Route exact path="/admin/account"
          element={
            <ProtectedRoute>
              <AdminAccount />
            </ProtectedRoute>
          }
        />



      </Routes>
    </Layout>
  );
}

export default App;
