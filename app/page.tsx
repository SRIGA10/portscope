"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Filter,
  Globe2,
  LayoutDashboard,
  Network,
  Pause,
  Play,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Wifi,
  X,
} from "lucide-react";

type Connection = {
  id: number;
  sourceIp: string;
  sourcePort: number;
  destinationIp: string;
  destinationPort: number;
  protocol: "TCP" | "UDP";
  application: string;
  status: "Established" | "Listening" | "Closed";
  time: string;
};

const initialConnections: Connection[] = [
  {
    id: 1,
    sourceIp: "192.168.1.24",
    sourcePort: 52341,
    destinationIp: "142.250.195.14",
    destinationPort: 443,
    protocol: "TCP",
    application: "HTTPS",
    status: "Established",
    time: "09:21:14",
  },
  {
    id: 2,
    sourceIp: "192.168.1.31",
    sourcePort: 53120,
    destinationIp: "8.8.8.8",
    destinationPort: 53,
    protocol: "UDP",
    application: "DNS",
    status: "Established",
    time: "09:21:12",
  },
  {
    id: 3,
    sourceIp: "192.168.1.18",
    sourcePort: 49211,
    destinationIp: "142.250.72.14",
    destinationPort: 443,
    protocol: "TCP",
    application: "HTTPS",
    status: "Established",
    time: "09:21:09",
  },
  {
    id: 4,
    sourceIp: "192.168.1.45",
    sourcePort: 55021,
    destinationIp: "151.101.1.69",
    destinationPort: 80,
    protocol: "TCP",
    application: "HTTP",
    status: "Established",
    time: "09:20:58",
  },
  {
    id: 5,
    sourceIp: "192.168.1.12",
    sourcePort: 60124,
    destinationIp: "192.168.1.1",
    destinationPort: 22,
    protocol: "TCP",
    application: "SSH",
    status: "Established",
    time: "09:20:51",
  },
  {
    id: 6,
    sourceIp: "192.168.1.37",
    sourcePort: 49872,
    destinationIp: "1.1.1.1",
    destinationPort: 53,
    protocol: "UDP",
    application: "DNS",
    status: "Established",
    time: "09:20:43",
  },
  {
    id: 7,
    sourceIp: "192.168.1.19",
    sourcePort: 49152,
    destinationIp: "172.217.160.46",
    destinationPort: 443,
    protocol: "TCP",
    application: "HTTPS",
    status: "Established",
    time: "09:20:37",
  },
  {
    id: 8,
    sourceIp: "192.168.1.28",
    sourcePort: 55210,
    destinationIp: "192.168.1.5",
    destinationPort: 3306,
    protocol: "TCP",
    application: "MySQL",
    status: "Listening",
    time: "09:20:31",
  },
  {
    id: 9,
    sourceIp: "192.168.1.41",
    sourcePort: 53482,
    destinationIp: "129.6.15.28",
    destinationPort: 123,
    protocol: "UDP",
    application: "NTP",
    status: "Established",
    time: "09:20:26",
  },
  {
    id: 10,
    sourceIp: "192.168.1.33",
    sourcePort: 50122,
    destinationIp: "192.168.1.10",
    destinationPort: 8080,
    protocol: "TCP",
    application: "HTTP Alternate",
    status: "Established",
    time: "09:20:18",
  },
  {
    id: 11,
    sourceIp: "192.168.1.16",
    sourcePort: 57890,
    destinationIp: "192.168.1.20",
    destinationPort: 445,
    protocol: "TCP",
    application: "SMB",
    status: "Established",
    time: "09:20:11",
  },
  {
    id: 12,
    sourceIp: "192.168.1.52",
    sourcePort: 61234,
    destinationIp: "192.168.1.1",
    destinationPort: 67,
    protocol: "UDP",
    application: "DHCP Server",
    status: "Established",
    time: "09:20:03",
  },
];

const portDatabase = [
  {
    port: 20,
    protocol: "TCP",
    application: "FTP Data",
    category: "Well-known",
  },
  {
    port: 21,
    protocol: "TCP",
    application: "FTP Control",
    category: "Well-known",
  },
  {
    port: 22,
    protocol: "TCP",
    application: "SSH",
    category: "Well-known",
  },
  {
    port: 23,
    protocol: "TCP",
    application: "Telnet",
    category: "Well-known",
  },
  {
    port: 25,
    protocol: "TCP",
    application: "SMTP",
    category: "Well-known",
  },
  {
    port: 53,
    protocol: "TCP/UDP",
    application: "DNS",
    category: "Well-known",
  },
  {
    port: 67,
    protocol: "UDP",
    application: "DHCP Server",
    category: "Well-known",
  },
  {
    port: 68,
    protocol: "UDP",
    application: "DHCP Client",
    category: "Well-known",
  },
  {
    port: 80,
    protocol: "TCP",
    application: "HTTP",
    category: "Well-known",
  },
  {
    port: 110,
    protocol: "TCP",
    application: "POP3",
    category: "Well-known",
  },
  {
    port: 123,
    protocol: "UDP",
    application: "NTP",
    category: "Well-known",
  },
  {
    port: 143,
    protocol: "TCP",
    application: "IMAP",
    category: "Well-known",
  },
  {
    port: 161,
    protocol: "UDP",
    application: "SNMP",
    category: "Well-known",
  },
  {
    port: 389,
    protocol: "TCP",
    application: "LDAP",
    category: "Registered",
  },
  {
    port: 443,
    protocol: "TCP",
    application: "HTTPS",
    category: "Well-known",
  },
  {
    port: 445,
    protocol: "TCP",
    application: "SMB",
    category: "Well-known",
  },
  {
    port: 465,
    protocol: "TCP",
    application: "SMTPS",
    category: "Registered",
  },
  {
    port: 587,
    protocol: "TCP",
    application: "SMTP Submission",
    category: "Registered",
  },
  {
    port: 993,
    protocol: "TCP",
    application: "IMAPS",
    category: "Well-known",
  },
  {
    port: 995,
    protocol: "TCP",
    application: "POP3S",
    category: "Well-known",
  },
  {
    port: 3306,
    protocol: "TCP",
    application: "MySQL",
    category: "Registered",
  },
  {
    port: 5432,
    protocol: "TCP",
    application: "PostgreSQL",
    category: "Registered",
  },
  {
    port: 6379,
    protocol: "TCP",
    application: "Redis",
    category: "Registered",
  },
  {
    port: 8080,
    protocol: "TCP",
    application: "HTTP Alternate",
    category: "Registered",
  },
];

const simulationApplications = [
  {
    port: 443,
    protocol: "TCP" as const,
    application: "HTTPS",
  },
  {
    port: 80,
    protocol: "TCP" as const,
    application: "HTTP",
  },
  {
    port: 53,
    protocol: "UDP" as const,
    application: "DNS",
  },
  {
    port: 22,
    protocol: "TCP" as const,
    application: "SSH",
  },
  {
    port: 123,
    protocol: "UDP" as const,
    application: "NTP",
  },
  {
    port: 3306,
    protocol: "TCP" as const,
    application: "MySQL",
  },
  {
    port: 8080,
    protocol: "TCP" as const,
    application: "HTTP Alternate",
  },
];

const destinationIps = [
  "8.8.8.8",
  "1.1.1.1",
  "142.250.195.14",
  "151.101.1.69",
  "172.217.160.46",
  "192.168.1.1",
];

export default function Home() {
  const [connections, setConnections] =
    useState<Connection[]>(initialConnections);

  const [activePage, setActivePage] = useState("Dashboard");

  const [search, setSearch] = useState("");

  const [protocol, setProtocol] = useState("All");

  const [status, setStatus] = useState("All");

  const [selected, setSelected] =
    useState<Connection | null>(null);

  const [running, setRunning] = useState(false);

  /*
   * REAL SIMULATION
   *
   * Every 3 seconds a new simulated connection
   * is generated while simulation is active.
   */
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      const selectedApp =
        simulationApplications[
          Math.floor(
            Math.random() * simulationApplications.length
          )
        ];

      const newConnection: Connection = {
        id: Date.now(),

        sourceIp: `192.168.1.${
          Math.floor(Math.random() * 200) + 10
        }`,

        sourcePort:
          Math.floor(Math.random() * 15000) + 49152,

        destinationIp:
          destinationIps[
            Math.floor(
              Math.random() * destinationIps.length
            )
          ],

        destinationPort: selectedApp.port,

        protocol: selectedApp.protocol,

        application: selectedApp.application,

        status: "Established",

        time: new Date().toLocaleTimeString("en-IN", {
          hour12: false,
        }),
      };

      setConnections((previous) => {
        const updated = [newConnection, ...previous];

        /*
         * Keep only the latest 50 connections
         * so the browser does not grow indefinitely.
         */
        return updated.slice(0, 50);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [running]);

  const filteredConnections = useMemo(() => {
    return connections.filter((connection) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        !text ||
        connection.sourceIp
          .toLowerCase()
          .includes(text) ||
        connection.destinationIp
          .toLowerCase()
          .includes(text) ||
        connection.application
          .toLowerCase()
          .includes(text) ||
        String(connection.sourcePort).includes(text) ||
        String(connection.destinationPort).includes(text);

      const matchesProtocol =
        protocol === "All" ||
        connection.protocol === protocol;

      const matchesStatus =
        status === "All" ||
        connection.status === status;

      return (
        matchesSearch &&
        matchesProtocol &&
        matchesStatus
      );
    });
  }, [connections, search, protocol, status]);

  const tcpCount = connections.filter(
    (connection) => connection.protocol === "TCP"
  ).length;

  const udpCount = connections.filter(
    (connection) => connection.protocol === "UDP"
  ).length;

  const applicationCount = new Set(
    connections.map((connection) => connection.application)
  ).size;

  const refresh = () => {
    setConnections((previous) =>
      [...previous].sort(() => Math.random() - 0.5)
    );
  };

  const clearLogs = () => {
    setConnections([]);
    setSelected(null);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#172033]">
      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}

        <aside className="hidden w-[245px] flex-col border-r border-[#dce2e9] bg-[#111827] text-white md:flex">

          <div className="flex h-20 items-center border-b border-white/10 px-6">

            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Network size={20} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-wide">
                PORTSCOPE
              </div>

              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Network Lab
              </div>
            </div>

          </div>

          <nav className="flex-1 px-3 py-6">

            {[
              {
                name: "Dashboard",
                icon: LayoutDashboard,
              },
              {
                name: "Connections",
                icon: Activity,
              },
              {
                name: "Port Database",
                icon: BookOpen,
              },
              {
                name: "Analytics",
                icon: BarChart3,
              },
              {
                name: "About",
                icon: CircleHelp,
              },
            ].map((item) => {
              const Icon = item.icon;

              const active =
                activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() =>
                    setActivePage(item.name)
                  }
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  {item.name}
                </button>
              );
            })}

          </nav>

          <div className="border-t border-white/10 p-5">

            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              Simulation Mode

            </div>

            <p className="text-[11px] leading-5 text-slate-500">
              Educational network traffic simulation.
              No real packets are captured.
            </p>

          </div>

        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <section className="flex min-w-0 flex-1 flex-col">

          {/* HEADER */}

          <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-[#dce2e9] bg-white px-5 py-4 md:px-8">

            <div>

              <h1 className="text-xl font-bold text-[#172033]">
                {activePage === "Dashboard"
                  ? "University Network Monitor"
                  : activePage}
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Transport-layer communication analysis
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 sm:flex">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                SYSTEM ONLINE

              </div>

              <button
                onClick={refresh}
                className="flex items-center gap-2 rounded-lg border border-[#d8dee7] bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <RefreshCw size={16} />

                Refresh
              </button>

            </div>

          </header>

          <div className="flex-1 p-5 md:p-8">

            {/* MOBILE BRAND */}

            <div className="mb-6 md:hidden">

              <div className="text-lg font-bold">
                PORTSCOPE
              </div>

              <div className="text-xs text-slate-500">
                University Network Lab
              </div>

            </div>

            {/* ================= DASHBOARD ================= */}

            {activePage === "Dashboard" && (
              <>

                <div className="mb-7">

                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">

                    <ShieldCheck size={15} />

                    Communication Overview

                  </div>

                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Port-Based Application Monitor
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Identify likely network applications
                    by analyzing source ports, destination
                    ports, and transport-layer protocols.
                  </p>

                </div>

                {/* STATISTICS */}

                <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                  <StatCard
                    icon={<Activity size={20} />}
                    label="Active Connections"
                    value={String(connections.length)}
                    detail="Simulated sessions"
                  />

                  <StatCard
                    icon={<Wifi size={20} />}
                    label="TCP Connections"
                    value={String(tcpCount)}
                    detail="Transmission Control"
                  />

                  <StatCard
                    icon={<Globe2 size={20} />}
                    label="UDP Connections"
                    value={String(udpCount)}
                    detail="User Datagram"
                  />

                  <StatCard
                    icon={<Server size={20} />}
                    label="Applications"
                    value={String(applicationCount)}
                    detail="Identified services"
                  />

                </div>

                {/* CONNECTION MONITOR */}

                <div className="overflow-hidden rounded-xl border border-[#dce2e9] bg-white shadow-sm">

                  <div className="border-b border-[#e5e9ef] p-5 md:p-6">

                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                      <div>

                        <h3 className="font-bold">
                          Live Connection Monitor
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Select a connection to inspect
                          its communication details.
                        </p>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {/* SEARCH */}

                        <div className="relative">

                          <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            value={search}
                            onChange={(e) =>
                              setSearch(e.target.value)
                            }
                            placeholder="Search..."
                            className="h-9 w-48 rounded-lg border border-[#d8dee7] pl-9 pr-3 text-xs outline-none focus:border-blue-500"
                          />

                        </div>

                        {/* PROTOCOL */}

                        <Select
                          value={protocol}
                          onChange={setProtocol}
                          options={[
                            "All",
                            "TCP",
                            "UDP",
                          ]}
                        />

                        {/* STATUS */}

                        <Select
                          value={status}
                          onChange={setStatus}
                          options={[
                            "All",
                            "Established",
                            "Listening",
                            "Closed",
                          ]}
                        />

                        {/* CLEAR */}

                        <button
                          onClick={clearLogs}
                          className="flex h-9 items-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Clear
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* TABLE */}

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[1050px] text-left text-xs">

                      <thead className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-slate-500">

                        <tr>

                          <th className="px-5 py-3 font-semibold">
                            #
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Source
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Source Port
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Destination
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Destination Port
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Protocol
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Application
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Status
                          </th>

                          <th className="px-3 py-3 font-semibold">
                            Time
                          </th>

                        </tr>

                      </thead>

                      <tbody className="divide-y divide-[#edf0f4]">

                        {filteredConnections.map(
                          (connection, index) => (
                            <tr
                              key={connection.id}
                              onClick={() =>
                                setSelected(connection)
                              }
                              className="cursor-pointer transition hover:bg-blue-50/50"
                            >

                              <td className="px-5 py-4 text-slate-400">
                                {index + 1}
                              </td>

                              <td className="px-3 py-4 font-mono text-slate-600">
                                {connection.sourceIp}
                              </td>

                              <td className="px-3 py-4 font-mono font-semibold">
                                {connection.sourcePort}
                              </td>

                              <td className="px-3 py-4 font-mono text-slate-600">
                                {connection.destinationIp}
                              </td>

                              <td className="px-3 py-4 font-mono font-semibold">
                                {connection.destinationPort}
                              </td>

                              <td className="px-3 py-4">

                                <span
                                  className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                                    connection.protocol ===
                                    "TCP"
                                      ? "bg-blue-50 text-blue-700"
                                      : "bg-violet-50 text-violet-700"
                                  }`}
                                >
                                  {connection.protocol}
                                </span>

                              </td>

                              <td className="px-3 py-4 font-semibold">
                                {connection.application}
                              </td>

                              <td className="px-3 py-4">

                                <span className="flex items-center gap-1.5 text-emerald-600">

                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                  {connection.status}

                                </span>

                              </td>

                              <td className="px-3 py-4 font-mono text-slate-400">
                                {connection.time}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                    {filteredConnections.length === 0 && (
                      <div className="p-12 text-center">

                        <Filter className="mx-auto mb-3 text-slate-300" />

                        <p className="text-sm font-medium">
                          No connections found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your filters.
                        </p>

                      </div>
                    )}

                  </div>

                  {/* TABLE FOOTER */}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e9ef] bg-[#fafbfc] px-5 py-3">

                    <span className="text-[11px] text-slate-500">
                      Showing{" "}
                      {filteredConnections.length} of{" "}
                      {connections.length} connections
                    </span>

                    <button
                      onClick={() =>
                        setRunning((previous) => !previous)
                      }
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                        running
                          ? "bg-slate-800 text-white"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >

                      {running ? (
                        <Pause size={14} />
                      ) : (
                        <Play size={14} />
                      )}

                      {running
                        ? "Pause Simulation"
                        : "Start Simulation"}

                    </button>

                  </div>

                </div>

              </>
            )}

            {/* ================= CONNECTIONS ================= */}

            {activePage === "Connections" && (
              <SimplePage
                title="Connection Analysis"
                description="Detailed view of simulated university network connections."
                icon={<Activity size={22} />}
              >

                <div className="rounded-xl border border-[#dce2e9] bg-white p-6">

                  <p className="text-sm leading-6 text-slate-600">
                    Use the Dashboard connection monitor
                    to search, filter, and inspect
                    individual network connections.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <MiniInfo
                      title="Total Connections"
                      value={String(connections.length)}
                    />

                    <MiniInfo
                      title="TCP"
                      value={String(tcpCount)}
                    />

                    <MiniInfo
                      title="UDP"
                      value={String(udpCount)}
                    />

                  </div>

                </div>

              </SimplePage>
            )}

            {/* ================= PORT DATABASE ================= */}

            {activePage === "Port Database" && (
              <SimplePage
                title="Port Database"
                description="Reference database of common transport-layer ports."
                icon={<BookOpen size={22} />}
              >

                <div className="overflow-hidden rounded-xl border border-[#dce2e9] bg-white">

                  <div className="border-b border-slate-200 p-5">

                    <div className="relative max-w-md">

                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        placeholder="Search port or application..."
                        className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
                        onChange={(event) => {
                          const value =
                            event.target.value.toLowerCase();

                          const rows =
                            document.querySelectorAll(
                              "[data-port-row]"
                            );

                          rows.forEach((row) => {
                            const text =
                              row.textContent?.toLowerCase() ??
                              "";

                            (
                              row as HTMLElement
                            ).style.display =
                              text.includes(value)
                                ? ""
                                : "none";
                          });
                        }}
                      />

                    </div>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[650px] text-left text-sm">

                      <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                        <tr>

                          <th className="px-6 py-4">
                            Port
                          </th>

                          <th className="px-6 py-4">
                            Protocol
                          </th>

                          <th className="px-6 py-4">
                            Application
                          </th>

                          <th className="px-6 py-4">
                            Category
                          </th>

                        </tr>

                      </thead>

                      <tbody className="divide-y divide-slate-100">

                        {portDatabase.map((item) => (
                          <tr
                            key={`${item.port}-${item.application}`}
                            data-port-row
                            className="hover:bg-slate-50"
                          >

                            <td className="px-6 py-4 font-mono font-bold">
                              {item.port}
                            </td>

                            <td className="px-6 py-4">
                              {item.protocol}
                            </td>

                            <td className="px-6 py-4 font-semibold">
                              {item.application}
                            </td>

                            <td className="px-6 py-4 text-slate-500">
                              {item.category}
                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </SimplePage>
            )}

            {/* ================= ANALYTICS ================= */}

            {activePage === "Analytics" && (
              <SimplePage
                title="Network Analytics"
                description="Summary of simulated communication patterns."
                icon={<BarChart3 size={22} />}
              >

                <div className="grid gap-5 md:grid-cols-3">

                  <AnalyticsCard
                    title="TCP Distribution"
                    value={
                      connections.length
                        ? `${Math.round(
                            (tcpCount /
                              connections.length) *
                              100
                          )}%`
                        : "0%"
                    }
                    label="of connections"
                  />

                  <AnalyticsCard
                    title="UDP Distribution"
                    value={
                      connections.length
                        ? `${Math.round(
                            (udpCount /
                              connections.length) *
                              100
                          )}%`
                        : "0%"
                    }
                    label="of connections"
                  />

                  <AnalyticsCard
                    title="Applications"
                    value={String(applicationCount)}
                    label="identified"
                  />

                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  <AnalyticsPanel title="Protocol Distribution">

                    <DistributionBar
                      label="TCP"
                      value={
                        connections.length
                          ? Math.round(
                              (tcpCount /
                                connections.length) *
                                100
                            )
                          : 0
                      }
                    />

                    <DistributionBar
                      label="UDP"
                      value={
                        connections.length
                          ? Math.round(
                              (udpCount /
                                connections.length) *
                                100
                            )
                          : 0
                      }
                    />

                  </AnalyticsPanel>

                  <AnalyticsPanel title="Connection Status">

                    <DistributionBar
                      label="Established"
                      value={
                        connections.length
                          ? Math.round(
                              (connections.filter(
                                (c) =>
                                  c.status ===
                                  "Established"
                              ).length /
                                connections.length) *
                                100
                            )
                          : 0
                      }
                    />

                    <DistributionBar
                      label="Listening"
                      value={
                        connections.length
                          ? Math.round(
                              (connections.filter(
                                (c) =>
                                  c.status ===
                                  "Listening"
                              ).length /
                                connections.length) *
                                100
                            )
                          : 0
                      }
                    />

                  </AnalyticsPanel>

                </div>

              </SimplePage>
            )}

            {/* ================= ABOUT ================= */}

            {activePage === "About" && (
              <SimplePage
                title="About PORTSCOPE"
                description="Educational university networking project."
                icon={<CircleHelp size={22} />}
              >

                <div className="max-w-3xl rounded-xl border border-[#dce2e9] bg-white p-7">

                  <h3 className="text-lg font-bold">
                    Port-Based Communication Monitor
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    PORTSCOPE demonstrates how source
                    ports, destination ports, and
                    transport-layer protocols can be used
                    to identify likely network
                    applications.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">

                    {[
                      [
                        "TCP",
                        "Transmission Control Protocol",
                      ],
                      [
                        "UDP",
                        "User Datagram Protocol",
                      ],
                      [
                        "Port",
                        "Logical transport endpoint",
                      ],
                      [
                        "Application",
                        "Service associated with a port",
                      ],
                    ].map(([title, description]) => (
                      <div
                        key={title}
                        className="rounded-lg border border-slate-200 p-4"
                      >

                        <div className="font-semibold">
                          {title}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {description}
                        </div>

                      </div>
                    ))}

                  </div>

                  <div className="mt-7 rounded-lg bg-slate-50 p-4 text-xs leading-6 text-slate-500">

                    <strong className="text-slate-700">
                      Disclaimer:
                    </strong>{" "}
                    PORTSCOPE uses simulated network
                    connections for educational purposes.
                    It does not capture, intercept, or
                    inspect real network packets.

                  </div>

                </div>

              </SimplePage>
            )}

          </div>

          {/* FOOTER */}

          <footer className="border-t border-[#dce2e9] bg-white px-5 py-4 text-center text-[11px] text-slate-400">
            PORTSCOPE • University Network Lab •
            Educational Simulation
          </footer>

        </section>

        {/* ================= CONNECTION DETAILS ================= */}

        {selected && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/20">

            <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b border-slate-200 p-5">

                <div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Connection Details
                  </div>

                  <h3 className="mt-1 font-bold">
                    Connection
                  </h3>

                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>

              </div>

              <div className="space-y-5 p-5">

                <DetailRow
                  label="Source"
                  value={`${selected.sourceIp}:${selected.sourcePort}`}
                />

                <DetailRow
                  label="Destination"
                  value={`${selected.destinationIp}:${selected.destinationPort}`}
                />

                <DetailRow
                  label="Protocol"
                  value={selected.protocol}
                />

                <DetailRow
                  label="Application"
                  value={selected.application}
                />

                <DetailRow
                  label="Status"
                  value={selected.status}
                />

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">

                    <Network size={15} />

                    Communication Path

                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">

                    <div className="rounded-lg bg-white px-3 py-3 text-center shadow-sm">

                      <div className="font-mono font-semibold">
                        {selected.sourcePort}
                      </div>

                      <div className="mt-1 text-[10px] text-slate-400">
                        Source Port
                      </div>

                    </div>

                    <div className="h-px flex-1 bg-blue-200" />

                    <div className="rounded-lg bg-white px-3 py-3 text-center shadow-sm">

                      <div className="font-mono font-semibold">
                        {selected.destinationPort}
                      </div>

                      <div className="mt-1 text-[10px] text-slate-400">
                        Destination Port
                      </div>

                    </div>

                  </div>

                </div>

                <div className="rounded-xl border border-slate-200 p-5">

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Port Interpretation
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">

                    Destination port{" "}
                    <strong>
                      {selected.destinationPort}
                    </strong>{" "}
                    is commonly associated with{" "}
                    <strong>
                      {selected.application}
                    </strong>{" "}
                    traffic over{" "}
                    <strong>
                      {selected.protocol}
                    </strong>.

                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-[#dce2e9] bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Live
        </span>

      </div>

      <div className="text-2xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-sm font-semibold">
        {label}
      </div>

      <div className="mt-1 text-xs text-slate-400">
        {detail}
      </div>

    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 appearance-none rounded-lg border border-[#d8dee7] bg-white pl-3 pr-8 text-xs outline-none focus:border-blue-500"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
      />

    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">

      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-semibold">
        {value}
      </span>

    </div>
  );
}

function SimplePage({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mb-7">

        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">

          {icon}

          PORTSCOPE

        </div>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

      </div>

      {children}
    </>
  );
}

function AnalyticsCard({
  title,
  value,
  label,
}: {
  title: string;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[#dce2e9] bg-white p-6 shadow-sm">

      <div className="text-sm font-semibold">
        {title}
      </div>

      <div className="mt-6 text-4xl font-bold text-blue-600">
        {value}
      </div>

      <div className="mt-2 text-xs text-slate-400">
        {label}
      </div>

    </div>
  );
}

function AnalyticsPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#dce2e9] bg-white p-6 shadow-sm">

      <h3 className="mb-6 font-bold">
        {title}
      </h3>

      <div className="space-y-5">
        {children}
      </div>

    </div>
  );
}

function DistributionBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between text-xs">

        <span className="font-medium">
          {label}
        </span>

        <span className="text-slate-500">
          {value}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

function MiniInfo({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">

      <div className="text-xs text-slate-400">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>

    </div>
  );
}