import Spinner from "@/app/components/layout/Spinner";

export default function Loading() {
  return (
    <section className="flex p-4">
      <Spinner 
        size="8"
        color="accb-green"
        name="Carregando..."
      />
    </section>
  )
}
