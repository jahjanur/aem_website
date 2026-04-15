import InteractiveFloorPlan from '@/components/floor-plan/InteractiveFloorPlan';
import PageHeader from '@/components/ui/PageHeader';

export default function ExplorePage() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)',
        paddingBottom: 160,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-page">
        <PageHeader
          eyebrow="Interactive Explorer"
          title="Find your perfect apartment"
          italicWord="apartment"
          description="Select a floor, hover over any unit to preview, then click to open full details and the 3D tour."
        />
        <InteractiveFloorPlan />
      </div>
    </section>
  );
}
