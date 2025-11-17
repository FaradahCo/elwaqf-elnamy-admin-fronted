import { Outlet } from "react-router";

const Consultation = ()=> {

    return <>
          <main className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-second-primary">
              الاستشارة
            </h1>
            <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
          </div>
          </main>
          <Outlet/>
    </>

}
export default Consultation;