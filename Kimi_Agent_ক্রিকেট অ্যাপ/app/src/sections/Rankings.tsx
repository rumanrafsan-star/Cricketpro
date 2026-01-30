import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { iccRankings, teams } from '@/data/mockData';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function Rankings() {
  const [activeFormat, setActiveFormat] = useState('test');

  const getTeamFlag = (teamName: string) => {
    const team = teams.find((t) => t.name === teamName);
    return team?.flag || '🏏';
  };

  const getTeamColor = (teamName: string) => {
    const team = teams.find((t) => t.name === teamName);
    return team?.color || '#ccc';
  };

  const getTrendIcon = (position: number) => {
    // Mock trend data
    const trends: Record<number, 'up' | 'down' | 'same'> = {
      1: 'same',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'same',
    };
    const trend = trends[position] || 'same';

    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <section id="rankings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            ICC <span className="text-gradient">RANKINGS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Official ICC team rankings across all formats of international cricket.
          </p>
        </div>

        {/* Rankings Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Tabs value={activeFormat} onValueChange={setActiveFormat}>
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                  {['test', 'odi', 't20'].map((format) => (
                    <TabsTrigger
                      key={format}
                      value={format}
                      className="flex-1 py-4 rounded-none data-[state=active]:bg-[#f2d24b] data-[state=active]:text-black data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-[#f2d24b] capitalize"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      {format === 'test' ? 'Test' : format.toUpperCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {(['test', 'odi', 't20'] as const).map((format) => (
                <TabsContent key={format} value={format} className="m-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-4 px-6 text-gray-500 font-medium w-24">Position</th>
                          <th className="text-left py-4 px-6 text-gray-500 font-medium">Team</th>
                          <th className="text-center py-4 px-6 text-gray-500 font-medium">Matches</th>
                          <th className="text-center py-4 px-6 text-gray-500 font-medium">Points</th>
                          <th className="text-center py-4 px-6 text-gray-500 font-medium">Rating</th>
                          <th className="text-center py-4 px-6 text-gray-500 font-medium">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {iccRankings[format].map((ranking) => (
                          <tr
                            key={ranking.position}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                    ranking.position === 1
                                      ? 'bg-[#f2d24b] text-black'
                                      : ranking.position === 2
                                      ? 'bg-gray-300 text-black'
                                      : ranking.position === 3
                                      ? 'bg-amber-700 text-white'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {ranking.position}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                  style={{
                                    background: `linear-gradient(135deg, ${getTeamColor(ranking.team)}20, ${getTeamColor(ranking.team)}40)`,
                                  }}
                                >
                                  {getTeamFlag(ranking.team)}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{ranking.team}</p>
                                  <p className="text-xs text-gray-500">
                                    {format === 'test' ? 'Test' : format.toUpperCase()} Team
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="font-semibold">{ranking.matches}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="font-semibold">{ranking.points.toLocaleString()}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="text-2xl font-bold text-[#f2d24b]">{ranking.rating}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {getTrendIcon(ranking.position)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-to-br from-[#f2d24b]/10 to-[#f2d24b]/5 border-[#f2d24b]/20">
            <CardContent className="p-6 text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3 text-[#f2d24b]" />
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">ICC Formats</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-500" />
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Ranked Teams</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-6 text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3 text-green-500" />
              <p className="text-3xl font-bold text-gray-900">Weekly</p>
              <p className="text-sm text-gray-600">Updates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
