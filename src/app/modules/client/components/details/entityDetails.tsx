import { Button, Skeleton } from "antd";
import {
  ClockCircleOutlined,
  StarFilled,
  TagFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import BreadCrumbComponent from "@shared/components/breadcrumb/breadcrumb";
import type { EntityDetailsProps } from "./details.model";

const EntityDetails = ({
  loading,
  breadcrumb,
  header,
  sidebar,
  sections,
  facts,
}: EntityDetailsProps) => {
  if (loading) {
    return (
      <>
        <BreadCrumbComponent
          items={[
            { path: breadcrumb.backPath, label: breadcrumb.backLabel },
            { path: null, label: breadcrumb.current },
          ]}
        />
        <div className="container mx-auto p-6">
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        </div>
      </>
    );
  }

  return (
    <>
      <BreadCrumbComponent
        items={[
          { path: breadcrumb.backPath, label: breadcrumb.backLabel },
          { path: null, label: header.title },
        ]}
      />

      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {header.image ? (
                  <img
                    src={header.image}
                    alt={header.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-sm text-primary mb-1">
                  {header.providerName}
                </p>
                <h1 className="text-xl md:text-2xl font-bold text-second-primary-900">
                  {header.title}
                </h1>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {header.field}
                  </span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarFilled
                      key={i}
                      className="text-base"
                      style={{
                        color:
                          i < header.rating
                            ? "var(--color-rating-filled)"
                            : "var(--color-rating)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="primary"
              className="shrink-0"
              style={{
                background: "var(--color-primary)",
                borderColor: "var(--color-primary)",
              }}
            >
              {header.ctaText}
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              {sections.map((sec, i) => (
                <section key={i} className={i ? "mt-6" : ""}>
                  <h2 className="font-semibold text-second-primary-900 mb-2">
                    {sec.title}
                  </h2>
                  {"text" in sec ? (
                    <p className="text-gray-700 leading-7">{sec.text}</p>
                  ) : (
                    <ul className="space-y-3">
                      {sec.items.map((d, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircleOutlined className="text-green-500 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Facts */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500 text-sm mb-1">مبلغ يبدأ من</p>
                  <p className="flex items-center gap-2 text-second-primary-900 font-semibold">
                    <TagFilled />
                    {facts.costFrom}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500 text-sm mb-1">
                    مدة الاستجابة للطلب
                  </p>
                  <p className="flex items-center gap-2 text-second-primary-900 font-semibold">
                    <ClockCircleOutlined />
                    {facts.responseTime || "7 أيام عمل"}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
                  <p className="text-gray-500 text-sm mb-1">مدة التنفيذ</p>
                  <p className="flex items-center gap-2 text-second-primary-900 font-semibold">
                    <ClockCircleOutlined />
                    {facts.deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {sidebar.map((card, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-second-primary-900 mb-3">
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="text-gray-700 text-sm">{card.description}</p>
                ) : null}
                {card.items ? (
                  <ul className="space-y-3">
                    {card.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <CheckCircleOutlined className="text-green-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {card.ctaText ? (
                  <Button
                    className="mt-4 w-full"
                    type="default"
                    style={{
                      color: "white",
                      background: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    {card.ctaText}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntityDetails;
