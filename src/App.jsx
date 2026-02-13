import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= PUBLIC ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import LoanApplication from "./pages/LoanApplication";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import Users from "./pages/Admin/Users";
import Customers from "./pages/Admin/Customers/Customers";
import CreateCustomer from "./pages/Admin/Customers/CreateCustomer";
import EditCustomer from "./pages/Admin/Customers/EditCustomer";
import Documents from "./pages/Admin/Documents/Documents";
import UploadDocument from "./pages/Admin/Documents/UploadDocuments";
import LoanFiles from "./pages/Admin/LoanFiles/LoanFiles";
import LoanDetails from "./pages/Admin/LoanFiles/LoanDetails";
import CreateLoan from "./pages/Admin/LoanFiles/CreateLoan";
import EditLoan from "./pages/Admin/LoanFiles/EditLoan";
import FileAssignment from "./pages/Admin/LoanFiles/FileAssignment";
import Reports from "./pages/Admin/Reports";
import Commission from "./pages/Admin/Commission/Commission";

/* ================= DATA OPERATOR ================= */
import DataOperatorDashboard from "./pages/DataOperator/DataOperatorDashboard";

/* ================= BANK EXECUTIVE ================= */
import BankExecutiveDashboard from "./pages/BankExecutive/BankExecutiveDashboard";
import MyFiles from "./pages/BankExecutive/MyFiles";
import ExecutiveUpdateStatus from "./pages/BankExecutive/ExecutiveUpdateStatus";
import ExecutiveDocuments from "./pages/BankExecutive/ExecutiveDocuments";
import DocumentVerification from "./pages/BankExecutive/DocumentVerification";
import ExecutiveProfile from "./pages/BankExecutive/ExecutiveProfile";
import FileDetails from "./pages/BankExecutive/FileDetails";
import Banks from "./pages/Admin/Bank/Banks";
import EditBank from "./pages/Admin/Bank/EditBank";

/* ================= COMMON ================= */
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import MarketingDashboard from "./pages/MarketingExecutive/MarketingDashboard";
import AllLeads from "./pages/MarketingExecutive/AllLeads";
import ConvertedLeads from "./pages/MarketingExecutive/ConvertedLeads";
import MarketingPerformance from "./pages/MarketingExecutive/MarketingPerformance";
import MarketingReports from "./pages/MarketingExecutive/MarketingReports";
import CreateBank from "./pages/Admin/Bank/CreateBank";
import BalanceTransferForm from "./pages/BalanceTransferForm";
import MedicalLoanForm from "./pages/MedicalLoanForm";
import CustomerRegistration from "./pages/CustomerRegistration";
import AIAssistant from "./Components/AI_Assistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer-registration" element={<CustomerRegistration />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/balance-transfer" element={<BalanceTransferForm />} />
        <Route path="/medical-loan" element={<MedicalLoanForm />} />

        <Route path="/ai-assistant" element={<AIAssistant />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute allowedRole="admin">
            <Users />
          </ProtectedRoute>
        } />

        <Route path="/admin/customers" element={
          <ProtectedRoute allowedRole="admin">
            <Customers />
          </ProtectedRoute>
        } />

        <Route path="/admin/create-customer" element={
          <ProtectedRoute allowedRole="admin">
            <CreateCustomer />
          </ProtectedRoute>
        } />

        <Route path="/admin/edit-customer/:id" element={
          <ProtectedRoute allowedRole="admin">
            <EditCustomer />
          </ProtectedRoute>
        } />

        <Route path="/admin/loan-files" element={
          <ProtectedRoute allowedRole="admin">
            <LoanFiles />
          </ProtectedRoute>
        } />

        <Route path="/admin/loan-files/:id" element={
          <ProtectedRoute allowedRole="admin">
            <LoanDetails />
          </ProtectedRoute>
        } />

        <Route path="/admin/create-loan" element={
          <ProtectedRoute allowedRoles={["admin", "operator"]}>
            <CreateLoan />
          </ProtectedRoute>
        } />

        <Route path="/admin/edit-loan/:id" element={
          <ProtectedRoute allowedRoles={["admin", "operator"]}>
            <EditLoan />
          </ProtectedRoute>
        } />

        <Route path="/admin/file-assignment/*" element={
          <ProtectedRoute allowedRole="admin">
            <Layout>
            <FileAssignment />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/documents" element={
          <ProtectedRoute allowedRole="admin">
            <Documents />
          </ProtectedRoute>
        } />

        <Route path="/admin/upload-document" element={
          <ProtectedRoute allowedRole="admin">
            <UploadDocument />
          </ProtectedRoute>
        } />

        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRole="admin">
            <Reports />
          </ProtectedRoute>
        } />

        <Route path="/admin/commission" element={
          <ProtectedRoute allowedRole="admin">
            <Commission />
          </ProtectedRoute>
        } />

        {/* ================= DATA OPERATOR ================= */}
        <Route path="/operator/dashboard" element={
          <ProtectedRoute allowedRole="operator">
            <Layout>
              <DataOperatorDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/operator/customers" element={
          <ProtectedRoute allowedRole="operator">
              <Customers />
          </ProtectedRoute>
        } />

        <Route path="/operator/create-customer" element={
          <ProtectedRoute allowedRole="operator">
              <CreateCustomer />
          </ProtectedRoute>
        } />

        <Route path="/operator/loan-files" element={
          <ProtectedRoute allowedRole="operator">
              <LoanFiles />
          </ProtectedRoute>
        } />

        <Route path="/operator/create-loan" element={
          <ProtectedRoute allowedRole="operator">
              <CreateLoan />
          </ProtectedRoute>
        } />

        <Route path="/operator/documents" element={
          <ProtectedRoute allowedRole="operator">
              <Documents />
          </ProtectedRoute>
        } />

        <Route path="/operator/upload-document" element={
          <ProtectedRoute allowedRole="operator">
              <UploadDocument />
          </ProtectedRoute>
        } />


        {/* ================= MARKETING EXECUTIVE ================= */}
        <Route path="/marketing/dashboard" element={
          <ProtectedRoute allowedRole="marketing">
            <Layout>
              <MarketingDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/marketing/leads" element={
          <ProtectedRoute allowedRole="marketing">
            <Layout>
              <AllLeads />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/marketing/converted-leads" element={
          <ProtectedRoute allowedRole="marketing">
            <Layout>
              <ConvertedLeads />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/marketing/performance" element={
          <ProtectedRoute allowedRole="marketing">
            <Layout>
              <MarketingPerformance />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/marketing/reports" element={
          <ProtectedRoute allowedRole="marketing">
            <Layout>
              <MarketingReports />
            </Layout>
          </ProtectedRoute>
        } />



        {/* ================= BANK EXECUTIVE ================= */}
        <Route
          path="/admin/banks"
          element={
            <ProtectedRoute allowedRole="admin">
                <Banks /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-bank"
          element={
            <ProtectedRoute allowedRole="admin">
                <CreateBank /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-bank/:id"
          element={
            <ProtectedRoute allowedRole="admin">
                <EditBank /> 
            </ProtectedRoute>
          }
        />

        <Route path="/bank-executive" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
            <BankExecutiveDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/my-files" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <MyFiles />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/update-status" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <ExecutiveUpdateStatus />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/documents" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <ExecutiveDocuments />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/verify-documents" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <DocumentVerification />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/profile" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <ExecutiveProfile />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bank-executive/file/:id" element={
          <ProtectedRoute allowedRole="bank">
            <Layout>
              <FileDetails />
            </Layout>
          </ProtectedRoute>
        } />


        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
