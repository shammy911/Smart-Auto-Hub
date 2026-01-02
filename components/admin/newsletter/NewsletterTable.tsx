"use client";
import { useEffect, useState } from "react";
import SendButton from "./SendButton";

export default function NewsletterTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th>Title</th>
          <th>Created</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((n) => (
          <tr key={n.id}>
            <td>{n.title}</td>
            <td>{new Date(n.createdAt).toLocaleDateString()}</td>
            <td>{n.broadcasts?.[0]?.status ?? "NOT SENT"}</td>
            <td>
              <SendButton id={n.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
