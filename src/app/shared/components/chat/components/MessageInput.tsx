import { App, Avatar, Button, Input } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface MessageInputProps {
  onSendMessage: (messageText: string, selectedFiles: File[]) => void;
  currentUser: any;
  isSending?: boolean;
  onInputFocus?: () => void;
}

export interface MessageInputRef {
  clearInput: () => void;
  getMessageText: () => string;
  getSelectedFiles: () => File[];
}

const MessageInput = forwardRef<MessageInputRef, MessageInputProps>(
  ({ onSendMessage, currentUser, isSending = false, onInputFocus }, ref) => {
    const [messageText, setMessageText] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { message } = App.useApp();

    useImperativeHandle(ref, () => ({
      clearInput: () => {
        setMessageText("");
        setSelectedFiles([]);
      },
      getMessageText: () => messageText,
      getSelectedFiles: () => selectedFiles,
    }));

    const handleAttachmentClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const fileLargeThan1MB = files.filter(
        (file) => file.size > 5 * 1024 * 1024,
      );
      if (fileLargeThan1MB.length > 0) {
        message.warning("يرجى اختيار ملفات أصغر من 5MB");
        return;
      }
      if (files.length > 0) {
        setSelectedFiles((prev) => [...prev, ...files]);
      }
    };

    const removeFile = (index: number) => {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();

      if (!messageText.trim() && selectedFiles.length === 0) {
        return;
      }

      onSendMessage(messageText, selectedFiles);
    };
    return (
      <>
        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <span className="text-xs text-gray-600 truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            {/* User Avatar - Moved to Right */}
            <Avatar
              size={60}
              src={
                currentUser?.image ??
                currentUser?.profile?.[0]?.logo ??
                "/images/user.png"
              }
              className="bg-second-primary"
            />

            {/* Text Input with Icons Inside */}
            <div className="flex-1 relative">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onFocus={onInputFocus}
                placeholder="اكتب رسالتك هنا"
                className="bg-gray-100! rounded-2xl!"
                dir="rtl"
                size="large"
                disabled={isSending}
                prefix={
                  <>
                    <Button
                      type="text"
                      icon={<img src="/images/icon-send.svg" alt="send" />}
                      className="text-primary hover:text-primary-dark"
                      htmlType="submit"
                      size="large"
                      loading={isSending}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*,application/pdf,.doc,.docx,.txt"
                      multiple
                    />
                  </>
                }
                suffix={
                  <div className="flex items-center gap-1">
                    {selectedFiles.length > 0 && (
                      <span className="text-xs text-green-600">
                        {selectedFiles.length} ملف
                      </span>
                    )}
                    <Button
                      type="text"
                      icon={<img src="/images/attach 1.svg" alt="attach" />}
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleAttachmentClick}
                      size="small"
                      title="إضافة ملفات للرسالة"
                    />
                  </div>
                }
              />
            </div>
          </form>
        </div>
      </>
    );
  },
);

MessageInput.displayName = "MessageInput";

export default MessageInput;
