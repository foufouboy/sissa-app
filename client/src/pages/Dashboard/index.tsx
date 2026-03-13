import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import "./style.sass";

function Dashboard() {
  return (
    <div className="dashboard">
      <GenericCard title="Title">
        <div className="generic-card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>

          <GenericButton className="generic-button-primary">
            Button
          </GenericButton>
        </div>
      </GenericCard>
    </div>
  );
}

export default Dashboard;
