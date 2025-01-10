import {
  Typography,
  Card,
  Button,
  Descriptions,
  Space,
  Select,
  message,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PaymentDetailsPage() {
  const { organizationId, paymentId } = useParams()
  const navigate = useNavigate()
  const { checkOrganizationRole } = useUserContext()
  const isAdmin = checkOrganizationRole('owner')

  // Fetch payment details with user information
  const {
    data: payment,
    isLoading,
    refetch,
  } = Api.payment.findFirst.useQuery({
    where: {
      id: paymentId,
      organizationId,
    },
    include: {
      user: true,
    },
  })

  // Update payment status mutation
  const { mutateAsync: updatePayment } = Api.payment.update.useMutation()

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updatePayment({
        where: { id: paymentId },
        data: { status: newStatus },
      })
      message.success('Payment status updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update payment status')
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="las la-spinner la-spin la-3x" />
        </div>
      </PageLayout>
    )
  }

  if (!payment) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text type="danger">Payment not found</Text>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={2}>
              <i className="las la-file-invoice-dollar" /> Payment Details
            </Title>
            <Button
              type="default"
              onClick={() =>
                navigate(`/organizations/${organizationId}/payments`)
              }
            >
              <i className="las la-arrow-left" /> Back to Payments
            </Button>
          </div>

          <Card>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {payment.title}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <Text strong>${payment.amount}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {isAdmin ? (
                  <Select
                    value={payment.status}
                    style={{ width: 200 }}
                    onChange={handleStatusChange}
                    options={[
                      { value: 'PENDING', label: 'Pending' },
                      { value: 'COMPLETED', label: 'Completed' },
                      { value: 'FAILED', label: 'Failed' },
                      { value: 'CANCELLED', label: 'Cancelled' },
                    ]}
                  />
                ) : (
                  <Text>{payment.status}</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Created By">
                {payment.user?.name || payment.user?.email || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(payment.createdAt).format('MMMM D, YYYY h:mm A')}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {dayjs(payment.updatedAt).format('MMMM D, YYYY h:mm A')}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {(payment.status === 'COMPLETED' || isAdmin) &&
            payment.invoiceUrl && (
              <Card
                title={
                  <>
                    <i className="las la-file-invoice" /> Invoice
                  </>
                }
              >
                <Space>
                  <Button
                    type="primary"
                    href={payment.invoiceUrl}
                    target="_blank"
                  >
                    <i className="las la-download" /> Download Invoice
                  </Button>
                  <Button
                    type="default"
                    href={payment.invoiceUrl}
                    target="_blank"
                  >
                    <i className="las la-eye" /> View Invoice
                  </Button>
                </Space>
              </Card>
            )}
        </Space>
      </div>
    </PageLayout>
  )
}
