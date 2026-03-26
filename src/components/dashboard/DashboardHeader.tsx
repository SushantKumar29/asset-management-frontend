interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "User";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {firstName}!</h1>
      <p className="text-muted-foreground">Here's your asset intelligence dashboard</p>
    </div>
  );
};

export default DashboardHeader;
