import createSubscription from "@/shared/utils/createSubscription";
import { MenuItem, Select, Typography } from "@mui/material";
import { onNewSessions, useSessions } from "@/logic/session";

export const [useSelectedSession, , setSelectedSession, getSelectedSession] =
  createSubscription(function (setData) {
    return onNewSessions(function ({ data: sessionData }) {
      let currentSession = getSelectedSession();
      const sessions = sessionData?.sessions;
      if (sessions && !(currentSession && sessions.includes(currentSession))) {
        setData(sessions[0]);
      }
    });
  });
export default function SessionSelect() {
  const { data: sessionData } = useSessions();
  const sessions = sessionData?.sessions;
  const currentSession = useSelectedSession() ?? "";

  return sessions ? (
    sessions.length === 0 ? (
      <Typography color="error">No sessions yet.</Typography>
    ) : (
      <Select
        value={currentSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        size="small"
      >
        {sessions.map((e) => (
          <MenuItem key={e} value={e}>
            {e}
          </MenuItem>
        ))}
      </Select>
    )
  ) : (
    <Typography>Loading sessions...</Typography>
  );
}
