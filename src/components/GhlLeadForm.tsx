import { GHL_FORM } from "@/lib/constants";

export default function GhlLeadForm({
  id,
  iframeId,
}: {
  id: string;
  iframeId: string;
}) {
  return (
    <div id={id} className="ghl-lead-form">
      <div className="ghl-lead-form-card">
        <iframe
          src={GHL_FORM.src}
          id={iframeId}
          title={GHL_FORM.title}
          data-layout={"{'id':'INLINE'}"}
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={GHL_FORM.name}
          data-height={String(GHL_FORM.height)}
          data-layout-iframe-id={iframeId}
          data-form-id={GHL_FORM.id}
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          className="ghl-lead-form-iframe"
          style={{ width: "100%", height: GHL_FORM.height }}
        />
      </div>
    </div>
  );
}
