import { Typography, Card, Row, Col, Table, Tag, Statistic } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user, organization } = useUserContext()
  const isAdmin = user?.globalRole === 'ADMIN'

  // Fetch payments
  const { data: payments, isLoading: isLoadingPayments } =
    Api.payment.findMany.useQuery({
      where: isAdmin ? {} : { userId: user?.id },
      include: { user: true },
    })

  // Fetch documents
  const { data: documents, isLoading: isLoadingDocuments } =
    Api.document.findMany.useQuery({
      where: isAdmin ? {} : { userId: user?.id },
      include: { user: true },
    })

  // Payment statistics for admin
  const paymentStats = payments?.reduce((acc, payment) => {
    acc[payment.status] = (acc[payment.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const paymentColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'PAID'
              ? 'green'
              : status === 'PENDING'
              ? 'orange'
              : 'red'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
  ]

  const documentColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'VERIFIED'
              ? 'green'
              : status === 'PENDING'
              ? 'orange'
              : 'red'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
  ]

  // Payment trends table data
  const trendColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
  ]

  const trendData = payments?.map(payment => ({
    date: dayjs(payment.createdAt).format('MMM D'),
    amount: parseFloat(payment.amount),
  }))

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-bar" style={{ marginRight: 8 }}></i>
          {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
        </Title>
        <Text type="secondary">
          {isAdmin
            ? 'Overview of all payments and documents'
            : 'View your recent payments and document status'}
        </Text>

        {isAdmin && (
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Payments"
                  value={payments?.length || 0}
                  prefix={<i className="las la-money-bill"></i>}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Pending Payments"
                  value={paymentStats?.PENDING || 0}
                  prefix={<i className="las la-clock"></i>}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Completed Payments"
                  value={paymentStats?.PAID || 0}
                  prefix={<i className="las la-check-circle"></i>}
                />
              </Card>
            </Col>
          </Row>
        )}

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={isAdmin ? 24 : 12}>
            <Card
              title={
                <>
                  <i className="las la-money-check"></i> Recent Payments
                </>
              }
            >
              <Table
                dataSource={payments}
                columns={paymentColumns}
                loading={isLoadingPayments}
                pagination={{ pageSize: 5 }}
                rowKey="id"
              />
            </Card>
          </Col>
          {!isAdmin && (
            <Col xs={24} lg={12}>
              <Card
                title={
                  <>
                    <i className="las la-file-alt"></i> Document Verification
                    Status
                  </>
                }
              >
                <Table
                  dataSource={documents}
                  columns={documentColumns}
                  loading={isLoadingDocuments}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                />
              </Card>
            </Col>
          )}
        </Row>

        {isAdmin && trendData && trendData.length > 0 && (
          <Card
            title={
              <>
                <i className="las la-chart-line"></i> Payment Trends
              </>
            }
            style={{ marginTop: 24 }}
          >
            <Table
              dataSource={trendData}
              columns={trendColumns}
              pagination={{ pageSize: 10 }}
              rowKey="date"
            />
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
