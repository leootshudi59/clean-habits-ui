import DashboardNav from "@/components/layout/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Le composant de navigation (s'adapte mobile/desktop tout seul) */}
      <DashboardNav />

      {/* Zone de contenu principale :
         - md:pl-72 : Sur Desktop, on pousse le contenu à droite de la sidebar (qui fait w-72)
         - pb-24 : Sur Mobile, on laisse de la place en bas pour la BottomBar
      */}
      <main className="md:pl-72 pb-24 md:pb-8 min-h-screen transition-all duration-300">
        <div className="container mx-auto p-4 md:p-8 max-w-5xl animate-fade-in">
            {children}
        </div>
      </main>
    </div>
  );
}