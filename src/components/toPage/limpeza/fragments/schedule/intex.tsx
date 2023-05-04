import { Card } from "flowbite-react";

export default function Schedule() {
  return (
    <>
      <Card className="mb-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
          <span>Próxima faxina a ser realizada em:</span>
          <span>28/04/2023</span>
        </h5>
        <div>
          <p>Marly</p>
          <p>R$ 120,00</p>
          <p>A pagar</p>
        </div>
      </Card>
    </>
  );
}
