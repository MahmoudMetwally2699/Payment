import {
  Typography,
  Table,
  Button,
  Upload,
  Space,
  DatePicker,
  Select,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentsPage() {
  const { organizationId } = useParams()
  const { user, checkOrganizationRole } = useUserContext()
  const isAdmin = user?.globalRole === 'ADMIN' || checkOrganizationRole('owner')
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null])
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()

  // Fetch documents with filters
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: {
      organizationId,
      ...(statusFilter && { status: statusFilter }),
      ...(dateRange[0] &&
        dateRange[1] && {
          createdAt: {
            gte: dateRange[0].toISOString(),
            lte: dateRange[1].toISOString(),
          },
        }),
      ...(isAdmin ? {} : { userId: user?.id }),
    },
    include: {
      user: true,
    },
  })

  const handleUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await createDocument({
        data: {
          fileUrl: url,
          type: file.type,
          status: 'PENDING',
          userId: user?.id || '',
          organizationId: organizationId || '',
        },
      })
      message.success('Document uploaded successfully')
      refetch()
    } catch (error) {
      message.error('Failed to upload document')
    }
  }

  const handleStatusChange = async (documentId: string, newStatus: string) => {
    try {
      await updateDocument({
        where: { id: documentId },
        data: { status: newStatus },
      })
      message.success('Document status updated')
      refetch()
    } catch (error) {
      message.error('Failed to update document status')
    }
  }

  const columns = [
    {
      title: 'Document Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Text>{text.split('/')[1]?.toUpperCase() || text}</Text>
      ),
    },
    {
      title: 'Uploaded By',
      dataIndex: ['user', 'name'],
      key: 'user',
      render: (text: string) => <Text>{text || 'Unknown User'}</Text>,
    },
    {
      title: 'Upload Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text>{dayjs(date).format('YYYY-MM-DD HH:mm')}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text
          type={
            status === 'APPROVED'
              ? 'success'
              : status === 'REJECTED'
              ? 'danger'
              : 'warning'
          }
        >
          {status}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => window.open(record.fileUrl, '_blank')}
          >
            <i className="las la-eye" /> View
          </Button>
          {isAdmin && record.status === 'PENDING' && (
            <>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.id, 'APPROVED')}
              >
                <i className="las la-check" /> Approve
              </Button>
              <Button
                danger
                onClick={() => handleStatusChange(record.id, 'REJECTED')}
              >
                <i className="las la-times" /> Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-file-alt" /> Document Verification
        </Title>
        <Text type="secondary">
          Upload and manage identity verification documents. Supported formats:
          PDF, JPG, PNG
        </Text>

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          {!isAdmin && (
            <Upload.Dragger
              accept=".pdf,.jpg,.jpeg,.png"
              beforeUpload={file => {
                handleUpload(file)
                return false
              }}
              showUploadList={false}
              style={{ marginBottom: 24 }}
            >
              <p className="ant-upload-drag-icon">
                <i
                  className="las la-cloud-upload-alt"
                  style={{ fontSize: 48 }}
                />
              </p>
              <p className="ant-upload-text">Click or drag file to upload</p>
            </Upload.Dragger>
          )}

          {isAdmin && (
            <Space style={{ marginBottom: 16 }}>
              <Select
                style={{ width: 200 }}
                placeholder="Filter by status"
                allowClear
                onChange={setStatusFilter}
                options={[
                  { value: 'PENDING', label: 'Pending' },
                  { value: 'APPROVED', label: 'Approved' },
                  { value: 'REJECTED', label: 'Rejected' },
                ]}
              />
              <RangePicker
                onChange={dates =>
                  setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                }
              />
            </Space>
          )}

          <Table
            columns={columns}
            dataSource={documents}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </PageLayout>
  )
}
