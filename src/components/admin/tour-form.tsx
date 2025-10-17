'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface TourFormProps {
  tour?: any;
  countries: any[];
  mode: 'create' | 'edit';
}

export function TourForm({ tour, countries, mode }: TourFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: tour?.title || '',
    slug: tour?.slug || '',
    description: tour?.description || '',
    price: tour?.price || 0,
    durationDays: tour?.durationDays || 1,
    maxGroupSize: tour?.maxGroupSize || 15,
    difficulty: tour?.difficulty || '',
    countryId: tour?.countryId || '',
    location: tour?.location || '',
    published: tour?.published || false,
    featured: tour?.featured || false,
    coverImage: tour?.coverImage || '',
    highlights: tour?.highlights || [''],
    inclusions: tour?.inclusions || [''],
    exclusions: tour?.exclusions || [''],
    requirements: tour?.requirements || [''],
    itinerary: tour?.itinerary || [{ day: 1, title: '', description: '', activities: [''] }],
    faqs: tour?.faqs || [{ question: '', answer: '' }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === 'create' ? '/api/admin/tours' : `/api/admin/tours/${tour.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/admin/tours');
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save tour');
      }
    } catch (error) {
      alert('Failed to save tour');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const addArrayItem = (field: string, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as any[], defaultValue]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: string, index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tour Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  if (mode === 'create') {
                    setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                  }
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full min-h-[120px] px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="durationDays">Duration (Days) *</Label>
              <Input
                id="durationDays"
                type="number"
                value={formData.durationDays}
                onChange={(e) => setFormData(prev => ({ ...prev, durationDays: parseInt(e.target.value) }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxGroupSize">Max Group Size *</Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={formData.maxGroupSize}
                onChange={(e) => setFormData(prev => ({ ...prev, maxGroupSize: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Difficult">Difficult</option>
              </select>
            </div>
            <div>
              <Label htmlFor="countryId">Country *</Label>
              <select
                id="countryId"
                value={formData.countryId}
                onChange={(e) => setFormData(prev => ({ ...prev, countryId: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.name} ({country.region.name})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Starting from Cairo"
              />
            </div>
          </div>

          {/* Note: Cover image can be uploaded after tour creation via the Images tab */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              <strong>📸 Cover Image:</strong> Upload images after creating the tour using the "Images" management section.
            </p>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4"
              />
              <span>Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4"
              />
              <span>Featured</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                placeholder="Highlight"
              />
              {formData.highlights.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem('highlights', index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('highlights', '')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </Button>
        </CardContent>
      </Card>

      {/* Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Inclusions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.inclusions.map((inclusion, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={inclusion}
                onChange={(e) => updateArrayItem('inclusions', index, e.target.value)}
                placeholder="Inclusion"
              />
              {formData.inclusions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem('inclusions', index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('inclusions', '')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Inclusion
          </Button>
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Exclusions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.exclusions.map((exclusion, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={exclusion}
                onChange={(e) => updateArrayItem('exclusions', index, e.target.value)}
                placeholder="Exclusion"
              />
              {formData.exclusions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem('exclusions', index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('exclusions', '')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Exclusion
          </Button>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={requirement}
                onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                placeholder="Requirement"
              />
              {formData.requirements.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem('requirements', index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('requirements', '')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Requirement
          </Button>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">FAQ {index + 1}</h4>
                {formData.faqs.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('faqs', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Input
                value={faq.question}
                onChange={(e) => updateArrayItem('faqs', index, { ...faq, question: e.target.value })}
                placeholder="Question"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => updateArrayItem('faqs', index, { ...faq, answer: e.target.value })}
                placeholder="Answer"
                className="w-full min-h-[80px] px-3 py-2 border rounded-md"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === 'create' ? 'Create Tour' : 'Update Tour'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
