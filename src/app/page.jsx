import IndexPage from "@/components/pages/IndexPage";

export const metadata = {
  title: "TanzeenFood - Premium Natural Products | Honey, Ghee, Oil, Dates",
  description:
    "Shop premium organic products including raw honey, pure ghee, natural oils, and dates. Quality you can trust, delivered to your doorstep.",
  openGraph: {
    title: "TanzeenFood - Premium Natural Products",
    description: "Shop premium organic products including raw honey, pure ghee, natural oils, and dates.",
    type: "website",
  },
};

export default function Page() {
  return <IndexPage />;
}
