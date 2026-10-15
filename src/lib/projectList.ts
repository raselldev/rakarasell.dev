export const ProjectList = [
  {
    title: "DAPURWANGIGROUP",
    description:
      "A e-commerce platform with its own web store and mobile apps, built so the business can sell directly to customers.",
    problem:
      "The owner wanted to move from Tokopedia to the brand's own online store, but with as small a budget as possible.",
    solution:
      "Built one .NET Core backend shared by a Nuxt web store and Flutter apps for iOS and Android, with BCA Virtual Account and QRIS payments. Kept running costs low by self-hosting on an Indonesia-region VPS instead of managed cloud services.",
    result:
      "The business now owns its sales channel on web, iOS, and Android without marketplace fees, running for under $10/month in total.",
    link: "https://dapurwangigroup.com",
  },
  {
    title: "Migration Honda Smart Device",
    description:
      "Migration of Honda's dealer sales app, used by ~5,000 salespeople across Indonesia for SPK booking, from Xamarin to .NET MAUI.",
    problem:
      "Xamarin reached end of support, and new Google Play and App Store policies required apps to target newer platform versions. Without a framework migration, the app would be removed from both stores.",
    solution:
      "Migrated the app from Xamarin to .NET MAUI and updated it to meet the latest Android and iOS requirements, while keeping existing features and the SPK booking flow working for active users.",
    result:
      "Passed both store requirements with no takedown, so ~5,000 salespeople across 500+ dealers could keep booking SPK without disruption.",
    link: "https://play.google.com/store/apps/details?id=com.hpm.hondasmartdevice",
  },
  {
    title: "Data Transfer Honda Connect",
    description:
      "A data integration that feeds Indonesian dealer vehicle and service records into Honda Connect, the global connected-car app for Honda owners.",
    problem:
      "Honda Connect was built globally by the principal, so there was no direct interface between local dealer data and the customer app. Owners couldn't see their own vehicle and service history in it.",
    solution:
      "Built a scheduled integration with Spring Boot and cron jobs that pulls vehicle and service data from SQL Server and sends it to Honda Connect on a regular cycle.",
    result:
      "Customers can now see their complete vehicle and service data directly in the app.",
    link: "https://www.honda-indonesia.com/hondaconnect",
  },
  {
    title: "Arkamaya Culinary",
    description:
      "A landing page for Arkamaya Culinary, a baking and cooking school in Jakarta.",
    problem:
      "The school had no website to present its programs, so prospective students could only find it through social media or word of mouth.",
    solution:
      "Designed and built a WordPress landing page that presents the courses clearly and guides visitors to enroll or get in touch.",
    result:
      "The school's first proper web presence and a clear path from interest to enrollment.",
    link: "https://www.arkamayaculinary.com/",
  },
];
