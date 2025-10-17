'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { TourImageUpload } from '@/components/admin/tour-image-upload';

interface TourEditFormProps {
  tour: any;
  countries: any[];
}

export function TourEditForm({ tour, countries }: TourEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse JSON fields
  const parseJSON = (field: string | null) => {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  };

  const [formData, setFormData] = useState({
    title: tour.title,
    slug: tour.slug,
    description: tour.description,
    price: tour.price,
    priceEUR: tour.priceEUR || '',
    priceGBP: tour.priceGBP || '',
    priceKES: tour.priceKES || '',
    durationDays: tour.durationDays,
    countryId: tour.countryId,
    city: tour.city || '',
    latitude: tour.latitude || '',
    longitude: tour.longitude || '',
    difficulty: tour.difficulty || 'Moderate',
    maxGroupSize: tour.maxGroupSize || 12,
    minGroupSize: tour.minGroupSize || 2,
    ageRestriction: tour.ageRestriction || 'All ages',
    accommodationType: tour.accommodationType || 'Hotel',
    mealPlan: tour.mealPlan || 'Full Board',
    bestMonths: tour.bestMonths || '',
    metaDescription: tour.metaDescription || '',
    keywords: tour.keywords || '',
    published: tour.published,
  });

  // Dynamic arrays
  const [highlights, setHighlights] = useState<string[]>(parseJSON(tour.highlights));
  const [inclusions, setInclusions] = useState<string[]>(parseJSON(tour.inclusions));
  const [exclusions, setExclusions] = useState<string[]>(parseJSON(tour.exclusions));
  const [requirements, setRequirements] = useState<string[]>(parseJSON(tour.requirements));
  const [itinerary, setItinerary] = useState<any[]>(parseJSON(tour.itinerary));
  const [faqs, setFaqs] = useState<any[]>(parseJSON(tour.faqs));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        priceEUR: formData.priceEUR ? Number(formData.priceEUR) : null,
        priceGBP: formData.priceGBP ? Number(formData.priceGBP) : null,
        priceKES: formData.priceKES ? Number(formData.priceKES) : null,
        durationDays: Number(formData.durationDays),
        countryId: Number(formData.countryId),
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        maxGroupSize: Number(formData.maxGroupSize),
        minGroupSize: Number(formData.minGroupSize),
        highlights: JSON.stringify(highlights),
        inclusions: JSON.stringify(inclusions),
        exclusions: JSON.stringify(exclusions),
        requirements: JSON.stringify(requirements),
        itinerary: JSON.stringify(itinerary),
        faqs: JSON.stringify(faqs),
      };

      const response = await fetch(`/api/admin/tours/${tour.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update tour');
        return;
      }

      router.push('/admin/tours');
      router.refresh();
    } catch (error) {
      console.error('Error updating tour:', error);
      alert('Failed to update tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Array management functions
  const addItem = (
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter([...array, '']);
  };

  const updateItem = (
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const removeItem = (
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter(array.filter((_, i) => i !== index));
  };

  // Itinerary functions
  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: '', description: '' }]);
  };

  const updateItineraryDay = (index: number, field: string, value: string | number) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  const removeItineraryDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // FAQ functions
  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
  };

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/tours">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tours
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Edit Tour</h1>
              <p className="text-sm text-neutral-500 mt-1">{tour.title}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Tour Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-gold))] resize-y"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceEUR">Price (EUR)</Label>
                  <Input
                    id="priceEUR"
                    type="number"
                    value={formData.priceEUR}
                    onChange={(e) => setFormData({ ...formData, priceEUR: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceGBP">Price (GBP)</Label>
                  <Input
                    id="priceGBP"
                    type="number"
                    value={formData.priceGBP}
                    onChange={(e) => setFormData({ ...formData, priceGBP: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceKES">Price (KES)</Label>
                  <Input
                    id="priceKES"
                    type="number"
                    value={formData.priceKES}
                    onChange={(e) => setFormData({ ...formData, priceKES: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="countryId">Country *</Label>
                  <Select
                    value={formData.countryId.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, countryId: Number(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                          {country.name} ({country.region.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Details */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="durationDays">Duration (Days) *</Label>
                  <Input
                    id="durationDays"
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({ ...formData, durationDays: Number(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Challenging">Challenging</SelectItem>
                      <SelectItem value="Strenuous">Strenuous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minGroupSize">Min Group Size</Label>
                  <Input
                    id="minGroupSize"
                    type="number"
                    value={formData.minGroupSize}
                    onChange={(e) =>
                      setFormData({ ...formData, minGroupSize: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGroupSize">Max Group Size</Label>
                  <Input
                    id="maxGroupSize"
                    type="number"
                    value={formData.maxGroupSize}
                    onChange={(e) =>
                      setFormData({ ...formData, maxGroupSize: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ageRestriction">Age Restriction</Label>
                  <Input
                    id="ageRestriction"
                    value={formData.ageRestriction}
                    onChange={(e) => setFormData({ ...formData, ageRestriction: e.target.value })}
                    placeholder="e.g., All ages, 18+, 12+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodationType">Accommodation</Label>
                  <Select
                    value={formData.accommodationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, accommodationType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Lodge">Lodge</SelectItem>
                      <SelectItem value="Camping">Camping</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mealPlan">Meal Plan</Label>
                  <Select
                    value={formData.mealPlan}
                    onValueChange={(value) => setFormData({ ...formData, mealPlan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Board">Full Board</SelectItem>
                      <SelectItem value="Half Board">Half Board</SelectItem>
                      <SelectItem value="Breakfast Only">Breakfast Only</SelectItem>
                      <SelectItem value="Self Catering">Self Catering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bestMonths">Best Months to Visit</Label>
                  <Input
                    id="bestMonths"
                    value={formData.bestMonths}
                    onChange={(e) => setFormData({ ...formData, bestMonths: e.target.value })}
                    placeholder="e.g., June to September"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tour Highlights</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(highlights, setHighlights)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Highlight
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) =>
                      updateItem(highlights, setHighlights, index, e.target.value)
                    }
                    placeholder="Enter a highlight"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(highlights, setHighlights, index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {highlights.length === 0 && (
                <p className="text-sm text-neutral-500">No highlights added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Inclusions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>What's Included</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(inclusions, setInclusions)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Inclusion
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={inclusion}
                    onChange={(e) =>
                      updateItem(inclusions, setInclusions, index, e.target.value)
                    }
                    placeholder="What's included"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(inclusions, setInclusions, index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {inclusions.length === 0 && (
                <p className="text-sm text-neutral-500">No inclusions added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Exclusions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>What's Not Included</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(exclusions, setExclusions)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Exclusion
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={exclusion}
                    onChange={(e) =>
                      updateItem(exclusions, setExclusions, index, e.target.value)
                    }
                    placeholder="What's not included"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(exclusions, setExclusions, index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {exclusions.length === 0 && (
                <p className="text-sm text-neutral-500">No exclusions added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Requirements</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(requirements, setRequirements)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) =>
                      updateItem(requirements, setRequirements, index, e.target.value)
                    }
                    placeholder="Required documents or items"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(requirements, setRequirements, index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {requirements.length === 0 && (
                <p className="text-sm text-neutral-500">No requirements added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Itinerary</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Day
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {itinerary.map((day, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Day {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItineraryDay(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    value={day.title || ''}
                    onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                    placeholder="Day title"
                  />
                  <textarea
                    value={day.description || ''}
                    onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                    placeholder="Day description"
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-gold))] resize-y"
                  />
                </div>
              ))}
              {itinerary.length === 0 && (
                <p className="text-sm text-neutral-500">No itinerary added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Frequently Asked Questions</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>FAQ {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFAQ(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    value={faq.question || ''}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer || ''}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    placeholder="Answer"
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-gold))] resize-y"
                  />
                </div>
              ))}
              {faqs.length === 0 && (
                <p className="text-sm text-neutral-500">No FAQs added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Images</CardTitle>
            </CardHeader>
            <CardContent>
              <TourImageUpload
                tourId={tour.id}
                existingImages={tour.images || []}
                onUploadComplete={() => router.refresh()}
              />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={2}
                  placeholder="Brief description for search engines"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-gold))] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="safari, kenya, wildlife, adventure"
                />
              </div>
            </CardContent>
          </Card>

          {/* Published Status */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-neutral-300 text-[rgb(var(--color-gold))] focus:ring-[rgb(var(--color-gold))]"
                />
                <div>
                  <Label htmlFor="published" className="font-medium">
                    Published
                  </Label>
                  <p className="text-sm text-neutral-500">
                    {formData.published
                      ? 'This tour is visible to customers'
                      : 'This tour is hidden from customers'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pb-8">
            <Link href="/admin/tours">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90"
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
