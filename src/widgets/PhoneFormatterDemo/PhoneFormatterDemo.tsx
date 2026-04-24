import { useState } from "react";

import { formatPhone } from "../../utilities/formatPhone";

export const PhoneFormatterDemo = () => {
  const [phone, setPhone] = useState("");

  const formattedPhone = formatPhone(phone);

  return (
    <div style={{ padding: "16px", maxWidth: "420px" }}>
      <h2>Phone formatter demo</h2>

      <input
        type="text"
        placeholder="Введите номер телефона"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          marginBottom: "12px"
        }}
      />

      <div>
        <strong>Результат: </strong>
        {formattedPhone ?? "Неверный номер"}
      </div>
    </div>
  );
};
