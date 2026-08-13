export default function AdminOverview() {
  const stats = [
    { label: "Total Projects", value: "24" },
    { label: "Total Services", value: "8" },
    { label: "Active Packages", value: "3" },
    { label: "Testimonials", value: "12" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-secondary/30 border border-border">
            <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
            <div className="text-4xl font-heading font-bold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-secondary/30 border border-border">
        <h2 className="text-xl font-heading font-bold mb-4">Welcome to NullVoid Admin</h2>
        <p className="text-muted-foreground">
          Select a category from the sidebar to manage your portfolio, services, packages, or testimonials.
        </p>
      </div>
    </div>
  );
}
