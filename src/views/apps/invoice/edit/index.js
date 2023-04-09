import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import { Alert } from 'reactstrap'

// ** Invoice Preview Components
import orderService from "@Services/orderService"
import PreviewCard from './PreviewCard'

// ** Styles
import '@Styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
   const init = async()=>{
   const result =  await orderService.GetDetailProduct(id);
   setData(result?.data)
   }
   init()
  }, [])

  return data? (
    <div className='invoice-preview-wrapper' >
      
          <PreviewCard data={data} />
      {/* <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} /> */}
      {/* <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} /> */}
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>không tìm thấy Đơn hàng</h4>
    </Alert>
  )
}

export default InvoicePreview

