import { Typography, Card, Row, Col, Space } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={1}>
              <i className="las la-home" style={{ marginRight: '12px' }}></i>
              Welcome to Our Platform
            </Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Your all-in-one solution for managing organizations, payments, and
              documents
            </Paragraph>
          </div>

          {/* Features Grid */}
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Card
                style={{ height: '100%' }}
                title={
                  <span>
                    <i
                      className="las la-building"
                      style={{ marginRight: '8px' }}
                    ></i>
                    Organizations
                  </span>
                }
              >
                <Paragraph>
                  Create and manage multiple organizations. Invite team members
                  and assign roles to collaborate effectively.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                style={{ height: '100%' }}
                title={
                  <span>
                    <i
                      className="las la-credit-card"
                      style={{ marginRight: '8px' }}
                    ></i>
                    Payments
                  </span>
                }
              >
                <Paragraph>
                  Track all your payments in one place. View payment history,
                  generate invoices, and manage billing information.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                style={{ height: '100%' }}
                title={
                  <span>
                    <i
                      className="las la-file-alt"
                      style={{ marginRight: '8px' }}
                    ></i>
                    Documents
                  </span>
                }
              >
                <Paragraph>
                  Securely store and manage important documents. Upload,
                  organize, and share files with your team.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Getting Started Section */}
          <Card
            title={
              <span>
                <i className="las la-flag" style={{ marginRight: '8px' }}></i>
                Getting Started
              </span>
            }
          >
            <Space direction="vertical" size="middle">
              <div>
                <Title level={5}>
                  <i className="las la-1" style={{ marginRight: '8px' }}></i>
                  Create an Organization
                </Title>
                <Paragraph>
                  Start by creating your first organization. This will be your
                  main workspace for managing team members and resources.
                </Paragraph>
              </div>

              <div>
                <Title level={5}>
                  <i className="las la-2" style={{ marginRight: '8px' }}></i>
                  Invite Team Members
                </Title>
                <Paragraph>
                  Add team members to your organization and assign them
                  appropriate roles to collaborate effectively.
                </Paragraph>
              </div>

              <div>
                <Title level={5}>
                  <i className="las la-3" style={{ marginRight: '8px' }}></i>
                  Start Managing
                </Title>
                <Paragraph>
                  Begin managing payments, uploading documents, and utilizing
                  all the features available to streamline your operations.
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
