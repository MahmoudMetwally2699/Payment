import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  DatePicker,
  Space,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PaymentsPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null])
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Fetch payments
  const { data: payments, refetch } = Api.payment.findMany.useQuery({
    where: {
      organizationId,
      ...(dateRange[0] &&
        dateRange[1] && {
          createdAt: {
            gte: dateRange[0].toISOString(),
            lte: dateRange[1].toISOString(),
          },
        }),
      ...(statusFilter && { status: statusFilter }),
    },
    include: {
      user: true,
    },
  })

  // Create payment mutation
  const { mutateAsync: createPayment } = Api.payment.create.useMutation()

  // Update payment mutation
  const { mutateAsync: updatePayment } = Api.payment.update.useMutation()

  const handleCreatePayment = async (values: any) => {
    await createPayment({
      data: {
        title: values.title,
        amount: values.amount.toString(),
        status: 'PENDING',
        userId: user?.id || '',
        organizationId: organizationId || '',
      },
    })
    setIsModalOpen(false)
    form.resetFields()
    refetch()
  }

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    await updatePayment({
      where: { id: paymentId },
      data: { status: newStatus },
    })
    refetch()
  }

  const columns = [
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
      title: 'Requester',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text
          style={{
            color:
              status === 'APPROVED'
                ? '#52c41a'
                : status === 'REJECTED'
                ? '#f5222d'
                : '#faad14',
          }}
        >
          {status}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) =>
        user?.globalRole === 'ADMIN' && record.status === 'PENDING' ? (
          <Space>
            <Button
              type="primary"
              onClick={() => handleStatusChange(record.id, 'APPROVED')}
              icon={<i className="las la-check" />}
            >
              Approve
            </Button>
            <Button
              danger
              onClick={() => handleStatusChange(record.id, 'REJECTED')}
              icon={<i className="las la-times" />}
            >
              Reject
            </Button>
          </Space>
        ) : null,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-money-bill" /> Payment Requests
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              icon={<i className="las la-plus" />}
            >
              New Payment Request
            </Button>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <DatePicker.RangePicker
              onChange={dates =>
                setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])
              }
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Select
              placeholder="Filter by status"
              style={{ width: '100%' }}
              onChange={setStatusFilter}
              allowClear
            >
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="APPROVED">Approved</Select.Option>
              <Select.Option value="REJECTED">Rejected</Select.Option>
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={payments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Create Payment Request"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreatePayment} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter an amount' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
