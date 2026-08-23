import { FaqEditor } from "../../../../components/admin/FaqEditor";

export default function ContactFaqEditorPage() {
  return <FaqEditor documentKey="contact.faq" title="Contact FAQs" subtitle="Manage the questions displayed on the contact page." fallback={[{ q: "Which workspace options are available at KODESK?", a: "KODESK offers coworking space, dedicated desks, private offices, managed offices, meeting rooms, day passes and other flexible workspace options. Please contact our team for current availability." }, { q: "Is KODESK a good fit for startups and freelancers?", a: "Yes. Flexible workspace options are available for independent professionals, freelancers, startups and growing teams." }]} />;
}
