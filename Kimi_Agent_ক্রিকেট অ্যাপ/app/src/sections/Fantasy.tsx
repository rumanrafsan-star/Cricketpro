import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { players, fantasyTeams } from '@/data/mockData';
import type { Player } from '@/types/cricket';
import { Crown, Star, TrendingUp, Users, Wallet, Shield, Zap, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Fantasy() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget] = useState(100);
  const [usedBudget, setUsedBudget] = useState(0);

  const togglePlayer = (player: Player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
      setUsedBudget(usedBudget - (player.price || 0));
    } else if (selectedPlayers.length < 11 && usedBudget + (player.price || 0) <= budget) {
      setSelectedPlayers([...selectedPlayers, player]);
      setUsedBudget(usedBudget + (player.price || 0));
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Batsman':
        return <Zap className="w-4 h-4" />;
      case 'Bowler':
        return <Shield className="w-4 h-4" />;
      case 'All-Rounder':
        return <Star className="w-4 h-4" />;
      case 'Wicket-Keeper':
        return <Crown className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <section id="fantasy" className="py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            FANTASY <span className="text-gradient">LEAGUE</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your dream team, compete with friends, and win exciting prizes in our fantasy cricket league.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-[#f2d24b]" />
                    <span className="font-semibold">Budget</span>
                  </div>
                  <span className="text-2xl font-bold">
                    <span className={usedBudget > budget ? 'text-red-500' : 'text-green-600'}>
                      ${usedBudget.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-lg"> / ${budget}M</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      usedBudget > budget ? 'bg-red-500' : 'bg-[#f2d24b]'
                    }`}
                    style={{ width: `${Math.min((usedBudget / budget) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-gray-500">
                    <Users className="w-4 h-4 inline mr-1" />
                    {selectedPlayers.length}/11 Players
                  </span>
                  <span className="text-gray-500">
                    Remaining: ${(budget - usedBudget).toFixed(1)}M
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Player Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Select Players</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="batsman">Batsmen</TabsTrigger>
                    <TabsTrigger value="bowler">Bowlers</TabsTrigger>
                    <TabsTrigger value="all-rounder">All-Rounders</TabsTrigger>
                    <TabsTrigger value="wicket-keeper">WK</TabsTrigger>
                  </TabsList>

                  {['all', 'batsman', 'bowler', 'all-rounder', 'wicket-keeper'].map((role) => (
                    <TabsContent key={role} value={role} className="mt-0">
                      <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                        {players
                          .filter((p) => role === 'all' || p.role.toLowerCase().replace('-', '') === role)
                          .map((player) => {
                            const isSelected = selectedPlayers.find((p) => p.id === player.id);
                            return (
                              <button
                                key={player.id}
                                onClick={() => togglePlayer(player)}
                                disabled={!isSelected && selectedPlayers.length >= 11}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                  isSelected
                                    ? 'border-[#f2d24b] bg-[#f2d24b]/10'
                                    : 'border-gray-200 hover:border-gray-300'
                                } ${!isSelected && selectedPlayers.length >= 11 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isSelected ? 'bg-[#f2d24b]' : 'bg-gray-100'
                                  }`}>
                                    {getRoleIcon(player.role)}
                                  </div>
                                  <div className="text-left">
                                    <p className="font-semibold text-sm">{player.name}</p>
                                    <p className="text-xs text-gray-500">{player.team}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-[#f2d24b]">${player.price}M</p>
                                  <p className="text-xs text-gray-500">{player.stats.runs} runs</p>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Team */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#f2d24b]" />
                  My Team
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedPlayers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Select players to build your team</p>
                ) : (
                  <div className="space-y-3">
                    {selectedPlayers.map((player, index) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 w-4">{index + 1}</span>
                          {getRoleIcon(player.role)}
                          <span className="text-sm font-medium">{player.name}</span>
                        </div>
                        <button
                          onClick={() => togglePlayer(player)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPlayers.length === 11 && (
                  <Button className="w-full mt-4 bg-[#f2d24b] hover:bg-[#e6c200] text-black">
                    Save Team
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#f2d24b]" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {fantasyTeams.map((team, index) => (
                    <Dialog key={team.id}>
                      <DialogTrigger asChild>
                        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-[#f2d24b] text-black' :
                              index === 1 ? 'bg-gray-300 text-black' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {team.rank}
                            </span>
                            <div>
                              <p className="font-semibold text-sm">{team.name}</p>
                              <p className="text-xs text-gray-500">{team.players.length} players</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#f2d24b]">{team.totalPoints} pts</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{team.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Total Points</span>
                            <span className="text-2xl font-bold text-[#f2d24b]">{team.totalPoints}</span>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold">Players:</p>
                            {team.players.map((player) => (
                              <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>{player.name}</span>
                                <Badge variant="outline">{player.role}</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1 p-3 bg-[#f2d24b]/10 rounded-lg text-center">
                              <Crown className="w-5 h-5 mx-auto mb-1 text-[#f2d24b]" />
                              <p className="text-xs text-gray-500">Captain</p>
                              <p className="font-semibold text-sm">
                                {team.players.find((p) => p.id === team.captain)?.name}
                              </p>
                            </div>
                            <div className="flex-1 p-3 bg-gray-100 rounded-lg text-center">
                              <Star className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                              <p className="text-xs text-gray-500">Vice Captain</p>
                              <p className="font-semibold text-sm">
                                {team.players.find((p) => p.id === team.viceCaptain)?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
