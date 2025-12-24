import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderReviews } from "../../../serviceProvidersServices";
import { List, Rate, Avatar, Spin, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProviderReviewsTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: reviews, isLoading } = useApiQuery(
    ["getServiceProviderReviews", id],
    () => getServiceProviderReviews(id!),
    { enabled: !!id }
  );

  if (isLoading) return <Spin />;

  return (
    <div className="mt-6">
      {reviews?.data && reviews.data.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={reviews.data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} src={item.client?.avatar} />}
                title={
                  <div className="flex justify-between items-center">
                    <span>{item.client?.name}</span>
                    <span className="text-gray-400 text-sm">{item.created_at}</span>
                  </div>
                }
                description={
                  <div>
                    <Rate disabled defaultValue={item.rating} className="text-sm" />
                    <p className="mt-2 text-gray-700">{item.comment}</p>
                    <p className="text-xs text-info mt-1">{item.service_title}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="لا توجد مراجعات" />
      )}
    </div>
  );
};
export default ProviderReviewsTab;
